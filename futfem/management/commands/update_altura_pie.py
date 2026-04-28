from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta

from futfem.models import Jugadora
from futfem.services.soccerdonna_service import obtener_altura_y_pie_desde_url


class Command(BaseCommand):
    help = "Actualiza la altura y pie habil de las jugadoras desde Soccerdonna"

    def add_arguments(self, parser):
        parser.add_argument(
            "--force",
            action="store_true",
            help="Forzar actualización aunque ya se haya actualizado hoy"
        )

    def handle(self, *args, **options):
        force = options["force"]
        self.stdout.write(self.style.WARNING("Iniciando actualización de Altura y Pie Habil..."))

        hoy = timezone.now()
        limite = hoy - timedelta(days=1)

        if force:
            jugadoras = Jugadora.objects.exclude(soccerdonna_url__isnull=True)
        else:
            jugadoras = (
                Jugadora.objects.filter(soccerdonna_url__isnull=False)
                .filter(soccerdonna_last_updated__isnull=True)
                | Jugadora.objects.filter(
                    soccerdonna_url__isnull=False,
                    soccerdonna_last_updated__lt=limite
                )
            )

        total = jugadoras.count()
        self.stdout.write(f"{total} jugadoras para actualizar")

        actualizadas = 0

        for j in jugadoras:
            try:
                extra_info = obtener_altura_y_pie_desde_url(j.soccerdonna_url)
                j.altura = extra_info.get("altura")
                j.pie_habil = extra_info.get("pie_habil")
                j.soccerdonna_last_updated = timezone.now()
                j.save()
                actualizadas += 1
                self.stdout.write(
                    self.style.SUCCESS(
                        f"✔ {j.Nombre} {j.Apellidos} → Altura: {j.altura}, Pie: {j.pie_habil}"
                    )
                )
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f"✘ Error con {j.Nombre} {j.Apellidos}: {e}")
                )

        self.stdout.write(
            self.style.SUCCESS(f"\nActualización finalizada. {actualizadas}/{total} jugadoras actualizadas.")
        )