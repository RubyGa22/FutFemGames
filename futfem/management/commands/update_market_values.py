from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta

from futfem.models import Jugadora
from futfem.services.soccerdonna_service import obtener_valor_mercado_desde_url


class Command(BaseCommand):
    help = "Actualiza los market values de las jugadoras desde Soccerdonna"

    def add_arguments(self, parser):
        parser.add_argument(
            "--force",
            action="store_true",
            help="Forzar actualización aunque ya se haya actualizado hoy"
        )

    def handle(self, *args, **options):
        force = options["force"]

        self.stdout.write(self.style.WARNING("Iniciando actualización..."))

        hoy = timezone.now()
        limite = hoy - timedelta(days=1)

        if force:
            jugadoras = Jugadora.objects.exclude(soccerdonna_url__isnull=True)
        else:
            jugadoras = Jugadora.objects.filter(
                soccerdonna_url__isnull=False
            ).filter(
                soccerdonna_last_updated__isnull=True
            ) | Jugadora.objects.filter(
                soccerdonna_url__isnull=False,
                soccerdonna_last_updated__lt=limite
            )

        total = jugadoras.count()
        self.stdout.write(f"{total} jugadoras para actualizar")

        actualizadas = 0

        for j in jugadoras:
            try:
                result = obtener_valor_mercado_desde_url(j.soccerdonna_url)

                j.market_value = result["market_value"]
                j.soccerdonna_last_updated = timezone.now()
                j.save()

                actualizadas += 1

                self.stdout.write(
                    self.style.SUCCESS(
                        f"✔ {j.Nombre} {j.Apellidos} → {j.market_value}"
                    )
                )

            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(
                        f"✘ Error con {j.Nombre}: {e}"
                    )
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"\nActualización finalizada. {actualizadas}/{total} actualizadas."
            )
        )