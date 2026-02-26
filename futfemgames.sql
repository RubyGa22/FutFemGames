-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-02-2026 a las 11:10:47
-- Versión del servidor: 12.0.2-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `futfemgames`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add pista', 7, 'add_pista'),
(26, 'Can change pista', 7, 'change_pista'),
(27, 'Can delete pista', 7, 'delete_pista'),
(28, 'Can view pista', 7, 'view_pista'),
(29, 'Can add equipo', 8, 'add_equipo'),
(30, 'Can change equipo', 8, 'change_equipo'),
(31, 'Can delete equipo', 8, 'delete_equipo'),
(32, 'Can view equipo', 8, 'view_equipo'),
(33, 'Can add jugadora', 9, 'add_jugadora'),
(34, 'Can change jugadora', 9, 'change_jugadora'),
(35, 'Can delete jugadora', 9, 'delete_jugadora'),
(36, 'Can view jugadora', 9, 'view_jugadora'),
(37, 'Can add liga', 10, 'add_liga'),
(38, 'Can change liga', 10, 'change_liga'),
(39, 'Can delete liga', 10, 'delete_liga'),
(40, 'Can view liga', 10, 'view_liga'),
(41, 'Can add pais', 11, 'add_pais'),
(42, 'Can change pais', 11, 'change_pais'),
(43, 'Can delete pais', 11, 'delete_pais'),
(44, 'Can view pais', 11, 'view_pais'),
(45, 'Can add posicion', 12, 'add_posicion'),
(46, 'Can change posicion', 12, 'change_posicion'),
(47, 'Can delete posicion', 12, 'delete_posicion'),
(48, 'Can view posicion', 12, 'view_posicion'),
(49, 'Can add trayectoria', 13, 'add_trayectoria'),
(50, 'Can change trayectoria', 13, 'change_trayectoria'),
(51, 'Can delete trayectoria', 13, 'delete_trayectoria'),
(52, 'Can view trayectoria', 13, 'view_trayectoria'),
(53, 'Can add usuario', 14, 'add_usuario'),
(54, 'Can change usuario', 14, 'change_usuario'),
(55, 'Can delete usuario', 14, 'delete_usuario'),
(56, 'Can view usuario', 14, 'view_usuario'),
(57, 'Can add juego', 15, 'add_juego'),
(58, 'Can change juego', 15, 'change_juego'),
(59, 'Can delete juego', 15, 'delete_juego'),
(60, 'Can view juego', 15, 'view_juego'),
(61, 'Can add pista', 16, 'add_pista'),
(62, 'Can change pista', 16, 'change_pista'),
(63, 'Can delete pista', 16, 'delete_pista'),
(64, 'Can view pista', 16, 'view_pista'),
(65, 'Can add racha', 17, 'add_racha'),
(66, 'Can change racha', 17, 'change_racha'),
(67, 'Can delete racha', 17, 'delete_racha'),
(68, 'Can view racha', 17, 'view_racha'),
(69, 'Can add trofeo', 18, 'add_trofeo'),
(70, 'Can change trofeo', 18, 'change_trofeo'),
(71, 'Can delete trofeo', 18, 'delete_trofeo'),
(72, 'Can view trofeo', 18, 'view_trofeo'),
(73, 'Can add usuario', 19, 'add_usuario'),
(74, 'Can change usuario', 19, 'change_usuario'),
(75, 'Can delete usuario', 19, 'delete_usuario'),
(76, 'Can view usuario', 19, 'view_usuario'),
(77, 'Can add racha', 20, 'add_racha'),
(78, 'Can change racha', 20, 'change_racha'),
(79, 'Can delete racha', 20, 'delete_racha'),
(80, 'Can view racha', 20, 'view_racha');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2026-02-24 09:43:17.868553', '381', 'Jackie NoëlleGroenen', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"B\\u00e9lgica (Secundaria)\"}}]', 9, 8),
(2, '2026-02-24 09:47:16.807111', '52', 'Surinam', 1, '[{\"added\": {}}]', 11, 8),
(3, '2026-02-24 09:47:41.157437', '24', 'EsmeeBrugts', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Surinam (Secundaria)\"}}]', 9, 8),
(4, '2026-02-24 10:05:00.324896', '53', 'Bosnia & Herzegonina', 1, '[{\"added\": {}}]', 11, 8),
(5, '2026-02-24 10:06:50.303181', '455', 'ZećiraMusovic', 2, '[{\"changed\": {\"fields\": [\"Altura\", \"Pie habil\", \"Imagen\", \"Soccerdonna url\", \"Soccerdonna last updated\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Bosnia & Herzegonina (Secundaria)\"}}]', 9, 8),
(6, '2026-02-24 10:08:48.716478', '54', 'Kosovo', 1, '[{\"added\": {}}]', 11, 8),
(7, '2026-02-24 10:10:09.276390', '472', 'KosovareAsllani', 2, '[{\"changed\": {\"fields\": [\"Altura\", \"Pie habil\", \"Imagen\", \"Soccerdonna url\", \"Market value\", \"Soccerdonna last updated\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Kosovo (Secundaria)\"}}]', 9, 8),
(8, '2026-02-24 11:12:39.013989', '437', 'Damaris BertaEgurrola Wienke', 2, '[{\"added\": {\"name\": \"jugadora pais\", \"object\": \"Espa\\u00f1a (Secundaria)\"}}]', 9, 8),
(9, '2026-02-24 11:47:33.853428', '472', 'KosovareAsllani', 2, '[{\"added\": {\"name\": \"trayectoria\", \"object\": \"KosovareAsllani - London City Lionesses (2024-act)\"}}]', 9, 8),
(10, '2026-02-24 13:32:39.829764', '55', 'Guinea Ecuatorial', 1, '[{\"added\": {}}]', 11, 8),
(11, '2026-02-24 13:33:04.996285', '55', 'Guinea Ecuatorial', 2, '[{\"changed\": {\"fields\": [\"Iso\"]}}]', 11, 8),
(12, '2026-02-24 13:33:29.945098', '21', 'Salma CelesteParalluelo Ayingono', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Guinea Ecuatorial (Secundaria)\"}}]', 9, 8),
(13, '2026-02-24 13:34:06.747440', '16', 'VictoriaLópez Serrano Felix', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Nigeria (Secundaria)\"}}]', 9, 8),
(14, '2026-02-24 13:34:43.709165', '272', 'SydneyJoy Schertenleib', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Estados Unidos (Secundaria)\"}}]', 9, 8),
(15, '2026-02-24 13:36:03.169715', '60', 'FiammaBenítez Iannuzzi', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Argentina (Secundaria)\"}}]', 9, 8),
(16, '2026-02-24 13:36:27.682331', '65', 'GiovanaQueiroz Costa', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Estados Unidos (Secundaria)\"}}]', 9, 8),
(17, '2026-02-24 13:38:01.541862', '94', 'BibianeSchulze-Solano', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Espa\\u00f1a (Secundaria)\"}}]', 9, 8),
(18, '2026-02-24 13:38:25.146109', '377', 'AleksandraZaremba Kupiec', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Espa\\u00f1a (Secundaria)\"}}]', 9, 8),
(19, '2026-02-24 13:39:28.858322', '56', 'Gambia', 1, '[{\"added\": {}}]', 11, 8),
(20, '2026-02-24 13:39:58.707779', '176', 'FatoumataKanteh Cham', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Espa\\u00f1a (Secundaria)\"}}, {\"changed\": {\"name\": \"jugadora pais\", \"object\": \"Gambia (Primaria)\", \"fields\": [\"Pais\"]}}]', 9, 8),
(21, '2026-02-24 13:41:47.485096', '89', 'Phoenetia Maiya LureenBrowne', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Estados Unidos (Secundaria)\"}}]', 9, 8),
(22, '2026-02-24 13:42:24.960324', '76', 'AliceMarques', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Francia (Secundaria)\"}}, {\"changed\": {\"name\": \"jugadora pais\", \"object\": \"Portugal (Primaria)\", \"fields\": [\"Pais\"]}}]', 9, 8),
(23, '2026-02-24 13:44:30.152588', '456', 'HannahAlice Hampton', 2, '[{\"changed\": {\"fields\": [\"Altura\", \"Pie habil\", \"Imagen\", \"Soccerdonna url\", \"Market value\", \"Soccerdonna last updated\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Espa\\u00f1a (Secundaria)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"HannahAlice Hampton - Chelsea (2023-act)\"}}]', 9, 8),
(24, '2026-02-24 13:44:51.128346', '456', 'HannahAlice Hampton', 2, '[{\"changed\": {\"fields\": [\"Market value\"]}}]', 9, 8),
(25, '2026-02-24 13:45:18.129860', '472', 'KosovareAsllani', 2, '[{\"changed\": {\"fields\": [\"Market value\"]}}]', 9, 8),
(26, '2026-02-24 13:52:13.289674', '29', 'Fc Rosengård', 2, '[{\"changed\": {\"fields\": [\"Color\", \"Latitud\", \"Longitud\"]}}]', 8, 8),
(27, '2026-02-24 13:55:01.255756', '30', 'Kopparbergs/Göteborg FC', 2, '[{\"changed\": {\"fields\": [\"Color\", \"Latitud\", \"Longitud\"]}}]', 8, 8),
(28, '2026-02-24 13:57:18.897161', '32', 'Standard Liege', 2, '[{\"changed\": {\"fields\": [\"Color\", \"Latitud\", \"Longitud\"]}}]', 8, 8),
(29, '2026-02-24 13:59:34.328978', '31', 'FCR 2001 Duisburg', 2, '[{\"changed\": {\"fields\": [\"Color\", \"Latitud\", \"Longitud\"]}}]', 8, 8),
(30, '2026-02-24 14:06:25.863262', '83', 'Leyendas', 2, '[{\"changed\": {\"fields\": [\"Latitud\", \"Longitud\"]}}]', 8, 8),
(31, '2026-02-24 18:21:35.245079', '473', 'SofiaJakobsson', 2, '[{\"changed\": {\"fields\": [\"Altura\", \"Pie habil\", \"Imagen\", \"Soccerdonna url\", \"Market value\", \"Soccerdonna last updated\"]}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"SofiaJakobsson - London City Lionesses (2024-2026)\"}}]', 9, 8),
(32, '2026-02-24 18:25:57.772109', '466', 'Anna Margaretha MarinaAstrid Miedema', 2, '[{\"changed\": {\"fields\": [\"Imagen\"]}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Anna Margaretha MarinaAstrid Miedema - Man City (2024-act)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Anna Margaretha MarinaAstrid Miedema - Arsenal (2017-2024)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Anna Margaretha MarinaAstrid Miedema - FC Bayern (2014-2017)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Anna Margaretha MarinaAstrid Miedema - SC Heerenveen (2011-2014)\"}}]', 9, 8),
(33, '2026-02-24 18:33:46.056611', '478', 'Liv AnnePennock', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Paises Bajos (Primaria)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Liv AnnePennock - Fc Twente (2024-act)\"}}]', 9, 8),
(34, '2026-02-24 18:42:10.081165', '479', 'JaimyRavensbergen', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Paises Bajos (Primaria)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"JaimyRavensbergen - Fc Twente (2023-act)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"JaimyRavensbergen - Ado den Haag (2019-2023)\"}}]', 9, 8),
(35, '2026-02-24 18:58:04.674507', '480', 'DaniqueNoordman', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Paises Bajos (Primaria)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"DaniqueNoordman - Ajax (2023-act)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"DaniqueNoordman - PEC Zwolle (2020-2023)\"}}]', 9, 8),
(36, '2026-02-24 19:39:24.545819', '481', 'DominiqueJanssen', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Paises Bajos (Primaria)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"DominiqueJanssen - Man United (2024-act)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"DominiqueJanssen - Wolfsburg (2019-2024)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"DominiqueJanssen - Arsenal (2015-2019)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"DominiqueJanssen - Essen (2013-2015)\"}}]', 9, 8),
(37, '2026-02-24 19:43:58.701844', '482', 'SheridaSpitse', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Paises Bajos (Primaria)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"SheridaSpitse - Ajax (2021-act)\"}}]', 9, 8),
(38, '2026-02-24 19:50:23.528026', '163', 'Valerenga', 1, '[{\"added\": {}}]', 8, 8),
(39, '2026-02-24 19:52:05.655214', '482', 'SheridaSpitse', 2, '[{\"added\": {\"name\": \"trayectoria\", \"object\": \"SheridaSpitse - Valerenga (2017-2020)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"SheridaSpitse - Fc Twente (2017-2017)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"SheridaSpitse - LSK Kvinner FK\\r\\n (2014-2016)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"SheridaSpitse - Fc Twente (2012-2013)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"SheridaSpitse - SC Heerenveen (2007-2012)\"}}]', 9, 8),
(40, '2026-02-24 20:01:21.439697', '449', 'Daniëllevan de Donk', 2, '[{\"added\": {\"name\": \"trayectoria\", \"object\": \"Dani\\u00ebllevan de Donk - OL Lyon (2021-2025)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Dani\\u00ebllevan de Donk - Arsenal (2016-2021)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Dani\\u00ebllevan de Donk - Kopparbergs/G\\u00f6teborg FC (2015-2015)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Dani\\u00ebllevan de Donk - PSV Eindhoven (2012-2015)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Dani\\u00ebllevan de Donk - VVV Venlo (2011-2012)\"}}]', 9, 8),
(41, '2026-02-24 23:11:15.143585', '4', 'OL Lyon', 2, '[{\"changed\": {\"fields\": [\"Color\", \"Latitud\", \"Longitud\"]}}]', 8, 8),
(42, '2026-02-25 08:47:42.357075', '483', 'Desireevan Lunteren', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Paises Bajos (Primaria)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Desireevan Lunteren - AZ Alkmaar (2023-act)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Desireevan Lunteren - PSV Eindhoven (2021-2022)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Desireevan Lunteren - Ajax (2019-2021)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Desireevan Lunteren - Freiburg (2018-2019)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Desireevan Lunteren - Ajax (2012-2018)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Desireevan Lunteren - AZ Alkmaar (2009-2012)\"}}]', 9, 8),
(43, '2026-02-25 09:00:01.667049', '164', 'Malmo FF', 1, '[{\"added\": {}}]', 8, 8),
(44, '2026-02-25 09:18:40.726419', '461', 'Mayra TatianaRamírez Ramírez', 2, '[{\"changed\": {\"fields\": [\"Altura\", \"Pie habil\", \"Imagen\", \"Soccerdonna url\", \"Market value\", \"Soccerdonna last updated\"]}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Mayra TatianaRam\\u00edrez Ram\\u00edrez - Chelsea (2024-act)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Mayra TatianaRam\\u00edrez Ram\\u00edrez - Levante UD (2022-2024)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Mayra TatianaRam\\u00edrez Ram\\u00edrez - CD Sporting de Huelva (2020-2022)\"}}]', 9, 8),
(45, '2026-02-25 09:29:42.254526', '484', 'ClaraSerrajordi Díaz', 2, '[{\"changed\": {\"fields\": [\"Altura\", \"Pie habil\", \"Imagen\", \"Soccerdonna url\", \"Market value\", \"Soccerdonna last updated\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Espa\\u00f1a (Primaria)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"ClaraSerrajordi D\\u00edaz - Fc Barcelona (2022-act)\"}}]', 9, 8),
(46, '2026-02-25 09:37:35.295399', '477', 'LaiaAleixandri López', 2, '[{\"changed\": {\"fields\": [\"Retiro\", \"Imagen\"]}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"LaiaAleixandri L\\u00f3pez - Fc Barcelona (2025-act)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"LaiaAleixandri L\\u00f3pez - Man City (2022-2025)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"LaiaAleixandri L\\u00f3pez - Atl\\u00e9tico (2017-2022)\"}}]', 9, 8),
(47, '2026-02-25 09:45:44.573349', '485', 'AïchaCámara Cámara', 2, '[{\"changed\": {\"fields\": [\"Altura\", \"Pie habil\", \"Imagen\", \"Soccerdonna url\", \"Market value\", \"Soccerdonna last updated\"]}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"A\\u00efchaC\\u00e1mara C\\u00e1mara - Fc Barcelona (2025-act)\"}}]', 9, 8),
(48, '2026-02-25 09:46:12.059532', '485', 'AïchaCámara Cámara', 2, '[{\"added\": {\"name\": \"jugadora pais\", \"object\": \"Espa\\u00f1a (Primaria)\"}}]', 9, 8),
(49, '2026-02-25 09:51:50.957371', '486', 'OnaBaradad Rius', 2, '[{\"changed\": {\"fields\": [\"Altura\", \"Pie habil\", \"Imagen\", \"Soccerdonna url\", \"Market value\", \"Soccerdonna last updated\"]}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Espa\\u00f1a (Primaria)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"OnaBaradad Rius - RCD Espanyol de Barcelona (2025-act)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"OnaBaradad Rius - Fc Barcelona B (2023-2025)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"OnaBaradad Rius - Fc Barcelona (2021-2023)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"OnaBaradad Rius - Fc Barcelona B (2020-2021)\"}}]', 9, 8),
(50, '2026-02-25 10:00:02.034567', '14', 'Ingrid SyrstadEngen', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Ingrid SyrstadEngen - OL Lyon (2025-act)\"}}, {\"changed\": {\"name\": \"trayectoria\", \"object\": \"Ingrid SyrstadEngen - Fc Barcelona (2021-2025)\", \"fields\": [\"A\\u00f1os\", \"Equipo actual\"]}}]', 9, 8),
(51, '2026-02-25 10:06:06.677739', '423', 'CarlaJulià Martínez', 2, '[{\"changed\": {\"fields\": [\"Nombre\", \"Apellidos\", \"Apodo\", \"Nacimiento\", \"Altura\", \"Pie habil\", \"Imagen\", \"Soccerdonna url\", \"Market value\", \"Soccerdonna last updated\"]}}, {\"changed\": {\"name\": \"trayectoria\", \"object\": \"CarlaJuli\\u00e0 Mart\\u00ednez - Levante de Badalona (2024-2025)\", \"fields\": [\"Equipo\", \"A\\u00f1os\"]}}, {\"changed\": {\"name\": \"trayectoria\", \"object\": \"CarlaJuli\\u00e0 Mart\\u00ednez - Fc Barcelona B (2025-act)\", \"fields\": [\"Equipo\", \"A\\u00f1os\"]}}, {\"deleted\": {\"name\": \"trayectoria\", \"object\": \"CarlaJuli\\u00e0 Mart\\u00ednez - Fc Barcelona (2012-2017)\"}}]', 9, 8),
(52, '2026-02-25 10:12:03.945869', '494', 'MartineFenger', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Noruega (Primaria)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"MartineFenger - Fc Barcelona (2025-act)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"MartineFenger - Fc Barcelona B (2025-act)\"}}]', 9, 8),
(53, '2026-02-25 10:16:58.523076', '495', 'LaiaMartret', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Espa\\u00f1a (Primaria)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"LaiaMartret - Fc Barcelona (2025-act)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"LaiaMartret - Fc Barcelona B (2025-act)\"}}]', 9, 8),
(54, '2026-02-25 10:25:50.589737', '496', 'AnnaÁlvarez Llopis', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Anna\\u00c1lvarez Llopis - Levante UD (2023-act)\"}}]', 9, 8),
(55, '2026-02-25 10:27:17.773080', '496', 'AnnaÁlvarez Llopis', 2, '[{\"changed\": {\"fields\": [\"Imagen\"]}}]', 9, 8),
(56, '2026-02-25 10:30:39.143902', '497', 'AlmaVelasco Heim', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Espa\\u00f1a (Primaria)\"}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Argentina (Secundaria)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"AlmaVelasco Heim - Levante UD (2024-act)\"}}]', 9, 8),
(57, '2026-02-25 10:37:22.900894', '498', 'DanielaLuque Fernández', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Espa\\u00f1a (Primaria)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"DanielaLuque Fern\\u00e1ndez - Levante UD (2024-act)\"}}]', 9, 8),
(58, '2026-02-25 10:41:53.346555', '499', 'Dolores Isabelda Silva', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Portugal (Primaria)\"}}]', 9, 8),
(59, '2026-02-25 10:43:28.787444', '165', 'Sporting Braga', 1, '[{\"added\": {}}]', 8, 8),
(60, '2026-02-25 10:46:26.287220', '499', 'Dolores Isabelda Silva', 2, '[{\"added\": {\"name\": \"trayectoria\", \"object\": \"Dolores Isabelda Silva - Levante UD (2025-act)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Dolores Isabelda Silva - Sporting Braga (2019-2025)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Dolores Isabelda Silva - Atl\\u00e9tico (2018-2019)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Dolores Isabelda Silva - Jena (2015-2017)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Dolores Isabelda Silva - FCR 2001 Duisburg (2011-2015)\"}}]', 9, 8),
(61, '2026-02-25 10:51:32.802760', '500', 'LucíaGonzález Comin', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Espa\\u00f1a (Primaria)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Luc\\u00edaGonz\\u00e1lez Comin - Levante UD (2024-act)\"}}]', 9, 8),
(62, '2026-02-25 11:01:33.105829', '412', 'ArianaArias Jiménez', 2, '[{\"changed\": {\"fields\": [\"Imagen\"]}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"ArianaArias Jim\\u00e9nez - Costa Adeje Tenerife\\r\\n (2025-2026)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"ArianaArias Jim\\u00e9nez - Levante UD (2026-act)\"}}, {\"changed\": {\"name\": \"trayectoria\", \"object\": \"ArianaArias Jim\\u00e9nez - Wolfsburg (2024-2025)\", \"fields\": [\"A\\u00f1os\", \"Equipo actual\"]}}]', 9, 8),
(63, '2026-02-25 11:01:44.799529', '412', 'ArianaArias Jiménez', 2, '[]', 9, 8),
(64, '2026-02-25 11:05:00.977608', '218', 'GemaSoliveres Cholbi', 2, '[{\"changed\": {\"fields\": [\"Retiro\", \"Imagen\"]}}]', 9, 8),
(65, '2026-02-25 11:10:01.083553', '497', 'AlmaVelasco Heim', 2, '[]', 9, 8),
(66, '2026-02-25 11:10:42.230421', '497', 'AlmaVelasco Heim', 2, '[{\"changed\": {\"name\": \"trayectoria\", \"object\": \"AlmaVelasco Heim - Levante UD (2024-act)\", \"fields\": [\"Equipo actual\"]}}]', 9, 8),
(67, '2026-02-25 11:11:11.177594', '496', 'AnnaÁlvarez Llopis', 2, '[{\"added\": {\"name\": \"jugadora pais\", \"object\": \"Espa\\u00f1a (Primaria)\"}}]', 9, 8),
(68, '2026-02-25 11:13:21.695541', '88', 'AsunMartínez Salinas', 2, '[{\"changed\": {\"fields\": [\"Altura\", \"Pie habil\", \"Retiro\", \"Soccerdonna url\", \"Market value\", \"Soccerdonna last updated\"]}}]', 9, 8),
(69, '2026-02-25 11:20:58.187975', '56', 'MerleBarth', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"changed\": {\"name\": \"trayectoria\", \"object\": \"MerleBarth - Atl\\u00e9tico (2022-act)\", \"fields\": [\"Equipo actual\"]}}]', 9, 8),
(70, '2026-02-25 11:22:07.866407', '48', 'AinhoaVicente Moraza', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"changed\": {\"name\": \"trayectoria\", \"object\": \"AinhoaVicente Moraza - Atl\\u00e9tico (2022-2025)\", \"fields\": [\"A\\u00f1os\", \"Equipo actual\"]}}]', 9, 8),
(71, '2026-02-25 11:22:53.676715', '89', 'Phoenetia Maiya LureenBrowne', 2, '[{\"changed\": {\"name\": \"trayectoria\", \"object\": \"Phoenetia Maiya LureenBrowne - Valencia cf (2024-2025)\", \"fields\": [\"A\\u00f1os\", \"Equipo actual\"]}}]', 9, 8),
(72, '2026-02-25 11:24:06.533855', '270', 'AlexiaFernández Díaz', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"changed\": {\"name\": \"trayectoria\", \"object\": \"AlexiaFern\\u00e1ndez D\\u00edaz - Granada CF (2023-2025)\", \"fields\": [\"A\\u00f1os\", \"Equipo actual\"]}}]', 9, 8),
(73, '2026-02-25 11:24:48.507045', '268', 'EdnaImade', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"EdnaImade - FC Bayern (2025-act)\"}}, {\"changed\": {\"name\": \"trayectoria\", \"object\": \"EdnaImade - Granada CF (2023-2025)\", \"fields\": [\"A\\u00f1os\", \"Equipo actual\"]}}]', 9, 8),
(74, '2026-02-25 11:27:57.207474', '407', 'InmaculadaGabarro Romero', 2, '[{\"changed\": {\"fields\": [\"Altura\", \"Pie habil\", \"Imagen\", \"Soccerdonna url\", \"Market value\", \"Soccerdonna last updated\"]}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"InmaculadaGabarro Romero - Everton (2026-act)\"}}, {\"changed\": {\"name\": \"trayectoria\", \"object\": \"InmaculadaGabarro Romero - Everton (2024-2025)\", \"fields\": [\"A\\u00f1os\", \"Equipo actual\"]}}, {\"changed\": {\"name\": \"trayectoria\", \"object\": \"InmaculadaGabarro Romero - Sevilla (2025-2026)\", \"fields\": [\"A\\u00f1os\", \"Equipo actual\"]}}]', 9, 8),
(75, '2026-02-25 11:30:34.248954', '455', 'ZećiraMusovic', 2, '[{\"changed\": {\"fields\": [\"Market value\"]}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Ze\\u0107iraMusovic - Malmo FF (2026-act)\"}}]', 9, 8),
(76, '2026-02-25 11:33:34.703432', '455', 'ZećiraMusovic', 2, '[{\"added\": {\"name\": \"trayectoria\", \"object\": \"Ze\\u0107iraMusovic - Chelsea (2021-2026)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Ze\\u0107iraMusovic - Fc Roseng\\u00e5rd (2014-2021)\"}}]', 9, 8),
(77, '2026-02-25 11:36:58.961753', '425', 'Maria FrancescaCaldentey Oliver', 2, '[{\"changed\": {\"fields\": [\"Altura\", \"Pie habil\", \"Imagen\", \"Soccerdonna url\", \"Market value\", \"Soccerdonna last updated\"]}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Maria FrancescaCaldentey Oliver - Arsenal (2024-act)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Maria FrancescaCaldentey Oliver - Fc Barcelona (2014-2024)\"}}]', 9, 8),
(78, '2026-02-25 11:42:09.186197', '411', 'JuliaBartel Holgado', 2, '[{\"changed\": {\"fields\": [\"Imagen\"]}}, {\"changed\": {\"name\": \"trayectoria\", \"object\": \"JuliaBartel Holgado - Chelsea (2024-2025)\", \"fields\": [\"A\\u00f1os\", \"Equipo actual\"]}}]', 9, 8),
(79, '2026-02-25 14:20:51.246678', '501', 'Smilla HilmaHolmberg', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Smilla HilmaHolmberg - Arsenal (2026-act)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Smilla HilmaHolmberg - Hammarby IF Fotbollf\\u00f6rening (2021-2026)\"}}]', 9, 8),
(80, '2026-02-25 14:21:01.228406', '501', 'Smilla HilmaHolmberg', 2, '[{\"added\": {\"name\": \"jugadora pais\", \"object\": \"Suecia (Primaria)\"}}]', 9, 8),
(81, '2026-02-25 14:45:58.555120', '474', 'Reginavan Eijk', 2, '[{\"changed\": {\"fields\": [\"Retiro\"]}}]', 9, 8),
(82, '2026-02-25 17:25:03.365156', '12', 'yaizaagarciaa27', 1, '[{\"added\": {}}]', 19, 8),
(83, '2026-02-25 17:28:13.413186', '12', 'yaizaagarciaa27', 2, '[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]', 19, 8),
(84, '2026-02-25 18:48:16.604985', '1', 'Juego 1: Guess Trayectoria', 2, '[{\"changed\": {\"fields\": [\"Valor\"]}}]', 7, 8),
(85, '2026-02-25 18:57:49.349138', '1', 'Juego 1: Guess Trayectoria', 2, '[{\"changed\": {\"fields\": [\"Valor\"]}}]', 7, 8),
(86, '2026-02-25 19:25:41.295809', '1', 'Juego 1: Guess Trayectoria', 2, '[{\"changed\": {\"fields\": [\"Valor\"]}}]', 7, 8),
(87, '2026-02-25 19:43:20.381022', '2', 'Juego 2: Wordle', 2, '[{\"changed\": {\"fields\": [\"Valor\"]}}]', 7, 8),
(88, '2026-02-25 19:46:17.963056', '2', 'Juego 2: Wordle', 2, '[{\"changed\": {\"fields\": [\"Valor\"]}}]', 7, 8),
(89, '2026-02-25 19:47:55.163152', '2', 'Juego 2: Wordle', 2, '[{\"changed\": {\"fields\": [\"Valor\"]}}]', 7, 8),
(90, '2026-02-25 19:50:34.043235', '2', 'Juego 2: Wordle', 2, '[{\"changed\": {\"fields\": [\"Valor\"]}}]', 7, 8),
(91, '2026-02-25 19:53:55.251744', '2', 'Juego 2: Wordle', 2, '[{\"changed\": {\"fields\": [\"Valor\"]}}]', 7, 8),
(92, '2026-02-25 19:55:41.961953', '2', 'Juego 2: Wordle', 2, '[{\"changed\": {\"fields\": [\"Valor\"]}}]', 7, 8),
(93, '2026-02-25 19:56:22.953909', '2', 'Juego 2: Wordle', 2, '[{\"changed\": {\"fields\": [\"Valor\"]}}]', 7, 8),
(94, '2026-02-25 20:17:27.227807', '1', 'Juego 1: Guess Trayectoria', 2, '[{\"changed\": {\"fields\": [\"Valor\"]}}]', 7, 8),
(95, '2026-02-26 00:03:29.104452', '502', 'Janou Johanna TheodoraLevels', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"jugadora pais\", \"object\": \"Paises Bajos (Primaria)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Janou Johanna TheodoraLevels - Wolfsburg (2025-act)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Janou Johanna TheodoraLevels - Leverkusen (2023-2025)\"}}, {\"added\": {\"name\": \"trayectoria\", \"object\": \"Janou Johanna TheodoraLevels - PSV Eindhoven (2018-2023)\"}}]', 9, 8),
(96, '2026-02-26 09:06:50.856935', '13', '2000merce', 1, '[{\"added\": {}}]', 19, 8),
(97, '2026-02-26 09:07:36.099696', '13', '2000merce', 2, '[{\"changed\": {\"fields\": [\"Staff status\"]}}]', 19, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(8, 'futfem', 'equipo'),
(15, 'futfem', 'juego'),
(9, 'futfem', 'jugadora'),
(10, 'futfem', 'liga'),
(11, 'futfem', 'pais'),
(16, 'futfem', 'pista'),
(12, 'futfem', 'posicion'),
(17, 'futfem', 'racha'),
(13, 'futfem', 'trayectoria'),
(18, 'futfem', 'trofeo'),
(14, 'futfem', 'usuario'),
(7, 'minijuegos', 'pista'),
(6, 'sessions', 'session'),
(20, 'usuarios', 'racha'),
(19, 'usuarios', 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2026-01-25 13:17:55.192039'),
(2, 'auth', '0001_initial', '2026-01-25 13:17:56.623102'),
(6, 'contenttypes', '0002_remove_content_type_name', '2026-01-25 13:17:56.962347'),
(7, 'auth', '0002_alter_permission_name_max_length', '2026-01-25 13:17:57.053383'),
(8, 'auth', '0003_alter_user_email_max_length', '2026-01-25 13:17:57.098894'),
(9, 'auth', '0004_alter_user_username_opts', '2026-01-25 13:17:57.103919'),
(10, 'auth', '0005_alter_user_last_login_null', '2026-01-25 13:17:57.183502'),
(11, 'auth', '0006_require_contenttypes_0002', '2026-01-25 13:17:57.184885'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2026-01-25 13:17:57.189272'),
(13, 'auth', '0008_alter_user_username_max_length', '2026-01-25 13:17:57.245208'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2026-01-25 13:17:57.290738'),
(15, 'auth', '0010_alter_group_name_max_length', '2026-01-25 13:17:57.360346'),
(16, 'auth', '0011_update_proxy_permissions', '2026-01-25 13:17:57.520542'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2026-01-25 13:17:57.565199'),
(18, 'sessions', '0001_initial', '2026-01-25 13:17:57.649156'),
(19, 'futfem', '0001_initial', '2026-01-25 13:19:36.939744'),
(20, 'minijuegos', '0001_initial', '2026-01-25 13:19:36.941663'),
(21, 'futfem', '0002_juego_pista_racha', '2026-01-25 19:33:39.206174'),
(22, 'futfem', '0003_alter_pista_options', '2026-01-25 19:33:39.208231'),
(23, 'futfem', '0004_alter_juego_options_alter_racha_options', '2026-01-25 19:33:39.210822'),
(24, 'admin', '0001_initial', '2026-02-24 09:43:05.987805'),
(25, 'admin', '0002_logentry_remove_auto_add', '2026-02-24 09:43:05.991585'),
(26, 'admin', '0003_logentry_add_action_flag_choices', '2026-02-24 09:43:05.994398');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('6vrh5x6waavwr4g58hp701yj4gf7f5u1', '.eJyrViotLk0sysyPz0xRsrLQgXPz8nOTilKVrJSKypIqjYyUdJSK8nPAigxrAf8mEjY:1vkmSm:OqudYp0PYNsbHzEVRhIQDYF9wHz6UAjI6YKRHpoWIic', '2026-02-10 17:02:48.211813'),
('9b14zwvkub4ou38qhehb2mrpw13j5tv7', '.eJxVjs0OgjAQhN-FsyH0D6hH7z4DmW5bqSJNWjio8d0FQqIeZ-ebmX0VHeap7-bsUhdscSwYLw6_RwO6uXF17BXjJZYUxykFU65Iubu5PEfrhtPO_hX0yP2S1s5WRjNhVU0eFlQT09IJKVrItjGCSFWNloo733glubfK1xY1oIkJuZTOeUYKcfuT8a8e490kt2w8EJ7ABYkCwJslkuKw4fz9AXOITbs:1vvIuH:gYo0XFgfRnONQC2E6i7-jy97AJZGOmqVC8ax5AEnnQM', '2026-03-11 17:42:41.788836'),
('9ux0u90sjz6urx8pv77i17lnmieyjyxa', 'eyJ1c3VhcmlvX2lkIjo4LCJ1c3VhcmlvX25vbWJyZSI6InJ2YnkyMiJ9:1vk6CR:85YZrILuDOmRsu-SJBFe7Ne0SA-1sKcWE7camhM6des', '2026-02-08 19:55:07.714342'),
('b97lnade4agv5zjd1f32y4p0w3fulgzp', '.eJxVjsEOwiAQRP-FsyErFEo9evcbml1AW62QQDExxn-XNk3U4868mZ0X67HMQ1-yT_3o2IEZtvvVCO3Nh8VwVwyXyG0McxqJLwjf3MxP0fnpuLF_BQPmoaaBqCMwqECCl8IJ8KJBcKC1B6OsRi1aiaClVtYbqbtOCaJGnpVsnGprackF0xjXmeZ7hnin5OuL9KCnEBVMcVqh_fsDwIBIOw:1vvHCT:SOv5R9iRu07E64-8FQDD0l6cY9rLISZWsR-iRJFbtk8', '2026-03-11 15:53:21.648588'),
('bc3xelnlevmn9g625t5bks560ptn38mc', '.eJxVjsEOwiAQRP-FsyErFEo9evcbml1AW62QQDExxn-XNk3U4868mZ0X67HMQ1-yT_3o2IEZtvvVCO3Nh8VwVwyXyG0McxqJLwjf3MxP0fnpuLF_BQPmoaaBqCMwqECCl8IJ8KJBcKC1B6OsRi1aiaClVtYbqbtOCaJGnpVsnGprackF0xjXmeZ7hnin5OuL9KCnEBVMcVqh_fsDwIBIOw:1vvHIZ:psfbF1-459TJ60jRKHt0MG_e0TvCEkNLSa4VKfdtBB8', '2026-03-11 15:59:39.301770'),
('cbra7gkhcv7mwem04uytp19w9xust1mm', '.eJxVjDEOwjAMRe-SGUVWXLspIztniOzE0AJqpaadKu4OlTrA-t97f3NJ1qVPa7U5DcWdXXSn300lP23cQXnIeJ98nsZlHtTvij9o9dep2OtyuH8HvdT-W4NqpxCFAMEwlAAWGoECzAaRMguHFgUYmbJF5K6joNrgjbAp1Lr3B8hvNtI:1vvObm:v6vhbeZo8tPcDh1vASOaVwDvLpSt9u0IrxrlHwqrl3s', '2026-03-11 23:47:58.447350'),
('kccotglvuz22a5vq69jnj3uubjkgdgf9', '.eJyrViotLk0sysyPz0xRsrLQgXPz8nOTilKVrJSKypIqjYyUdJSK8nPAigxrAf8mEjY:1vngcy:vVZVwI_PZj6xVDQ2EJHX_Exl0nX6cyb07GxA28Wklh4', '2026-02-18 17:25:20.977351'),
('thpznttlyc9qxhsyfyyw5i0s5xpf31eo', '.eJxVjDEOwjAMRe-SGUVWXLspIztniOzE0AJqpaadKu4OlTrA-t97f3NJ1qVPa7U5DcWdXXSn300lP23cQXnIeJ98nsZlHtTvij9o9dep2OtyuH8HvdT-W4NqpxCFAMEwlAAWGoECzAaRMguHFgUYmbJF5K6joNrgjbAp1Lr3B8hvNtI:1vvXGG:g2R2uME0jP-JajBkAtXBt223UZtGAU1sMGjAcR4XRT8', '2026-03-12 09:02:20.633609'),
('tv5jcknyvrv7q3wmdfcdgwzo0j4jhxoh', '.eJyrViotLk0sysyPz0xRsrLQgXPz8nOTilKVrJSKypIqjYyUdJSK8nPAigxrAf8mEjY:1vkoJP:PZafZlWWnfMOpK1tCK8nfj3fo2A_ap6fnri-EWbMOgI', '2026-02-10 19:01:15.417475'),
('wbxxh9xrnqn455n731gqa6sghvi79h56', '.eJxVjDEOwjAMRe-SGUVWXLspIztniOzE0AJqpaadKu4OlTrA-t97f3NJ1qVPa7U5DcWdXXSn300lP23cQXnIeJ98nsZlHtTvij9o9dep2OtyuH8HvdT-W4NqpxCFAMEwlAAWGoECzAaRMguHFgUYmbJF5K6joNrgjbAp1Lr3B8hvNtI:1vunyj:5r2dl68Lyl-GhA-iYIS4QRpUnw85iR3UezBsyBrhQFo', '2026-03-10 08:41:13.758345');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo-trofeo`
--

CREATE TABLE `equipo-trofeo` (
  `id` int(11) NOT NULL,
  `equipo` int(11) NOT NULL,
  `trofeo` int(11) NOT NULL,
  `temporada` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipo-trofeo`
--

INSERT INTO `equipo-trofeo` (`id`, `equipo`, `trofeo`, `temporada`) VALUES
(1, 1, 1, '2020-2021'),
(2, 1, 6, '2011-2012'),
(3, 1, 6, '2012-2013'),
(4, 1, 6, '2013-2014'),
(5, 1, 6, '2014-2015'),
(6, 1, 6, '2019-2020'),
(7, 1, 6, '2020-2021'),
(8, 1, 6, '2021-2022'),
(9, 1, 6, '2022-2023'),
(10, 1, 6, '2023-2024'),
(11, 1, 6, '2024-2025'),
(12, 1, 1, '2022-2023'),
(13, 1, 1, '2023-2024'),
(14, 1, 7, '1993-1994'),
(15, 1, 7, '2010-2011'),
(16, 1, 7, '2012-2013'),
(17, 1, 7, '2013-2014'),
(18, 1, 7, '2016-2017'),
(19, 1, 7, '2017-2018'),
(20, 1, 7, '2019-2020'),
(21, 1, 7, '2020-2021'),
(22, 1, 7, '2021-2022'),
(23, 1, 7, '2023-2024'),
(24, 1, 7, '2024-2025'),
(25, 1, 8, '2019-2020'),
(26, 1, 8, '2021-2022'),
(27, 1, 8, '2022-2023'),
(28, 1, 8, '2023-2024'),
(29, 1, 8, '2024-2025'),
(30, 1, 8, '2025-2026');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id_equipo` int(11) NOT NULL,
  `liga` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `escudo` text DEFAULT NULL,
  `color` varchar(8) NOT NULL,
  `latitud` double DEFAULT NULL,
  `longitud` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id_equipo`, `liga`, `nombre`, `escudo`, `color`, `latitud`, `longitud`) VALUES
(1, 1, 'Fc Barcelona', 'media/ES/clubes/FCBarcelona.png', '#a50044', 41.373571833355825, 2.050504851946637),
(2, 1, 'Levante UD', 'media/ES/clubes/Levante.png', '#b4053f', 39.43051768372623, -0.7753418058300606),
(3, 4, 'PSG', 'media/FR/clubes/Paris_Saint-Germain_FC.png', '#004170', NULL, NULL),
(4, 4, 'OL Lyon', 'media/FR/clubes/Olympique_Lyonnais.png', '#003781', 45.76523009485192, 4.982017399515395),
(5, 3, 'Wolfsburg', 'media/DE/clubes/VfL_Wolfsburg.png', '#65B32E', NULL, NULL),
(6, 1, 'Atlético', 'media/ES/clubes/Atletico_Madrid.png', '#CB3524', 40.50653826468365, -3.3596259192545745),
(7, 1, 'Real Madrid', 'media/ES/clubes/Real_Madrid.png', '#FEBE10', 40.47702783060132, -3.6142912830796035),
(8, 1, 'Real Sociedad', 'media/ES/clubes/Real_Sociedad.png', '#0067b1', 43.259004418773195, -2.0258840730902032),
(9, 1, 'Madrid cff', 'media/ES/clubes/Madridcff.png', '#fc03df', 40.2912898955688, -3.826638458091636),
(10, 1, 'Athletic', 'media/ES/clubes/Athletic_Bilbao.png', '#ee2523', 43.27690658130429, -2.8376301538656654),
(11, 7, 'Valencia cf', 'media/ES/clubes/Valenciacf.png', '#d18816', NULL, NULL),
(12, 1, 'Sevilla', 'media/ES/clubes/Sevilla_FC.png', '#f43333', 37.35238957117757, -5.946976398308113),
(13, 7, 'Real Betis', 'media/ES/clubes/Real_betis.png', '#0BB363', NULL, NULL),
(14, 3, 'FC Bayern', 'media/DE/clubes/FC_Bayern_München.png', '#0066b2', NULL, NULL),
(15, 3, 'Eintracht', 'media/DE/clubes/Eintracht_Frankfurt.png', '#E1000F', NULL, NULL),
(16, 3, 'Leverkusen', 'media/DE/clubes/Bayer_04_Leverkusen.png', '#E32221', NULL, NULL),
(17, 4, 'Paris Fc', 'media/FR/clubes/Paris_FC.png', '', NULL, NULL),
(18, 5, 'Arsenal', 'media/ENG/clubes/Arsenal.png', '#EF0107', NULL, NULL),
(19, 5, 'Aston Villa', 'media/ENG/clubes/Aston_Villa.png', '#95bfe5', NULL, NULL),
(20, 5, 'Chelsea', 'media/ENG/clubes/Chelsea_FC.png', '#034694', NULL, NULL),
(21, 5, 'Man City', 'media/ENG/clubes/Manchester_City_FC.png', '#6CABDD', NULL, NULL),
(22, 5, 'Man United', 'media/ENG/clubes/Manchester_United_FC.png', '#DA291C', NULL, NULL),
(23, 6, 'Ajax', 'media/NL/clubes/Ajax_Amsterdam.png', '#ffffff', 52.3130210302739, 4.928518627476792),
(24, 6, 'PSV Eindhoven', 'media/NL/clubes/PSV_Eindhoven.png', '#ED1C23', 51.45904459644252, 5.4393161656127536),
(25, 6, 'Fc Twente', 'media/NL/clubes/FC_Twente.png', '#FF0000', 52.236592946505816, 6.837600092523232),
(26, 1, 'RCD Espanyol de Barcelona', 'media/ES/clubes/RCD_Espanyol.png', '#007fc8', 41.4265544518678, 2.2126734839944375),
(27, 7, 'Villareal', 'media/ES/clubes/Villarreal_CF.png', '#ffe667', NULL, NULL),
(28, 21, 'Sporting Gijón', 'media/ES/clubes/Sporting_Gijon.png', '#FF0000', NULL, NULL),
(29, 8, 'Fc Rosengård', 'media/SE/clubes/FC_Rosengård.png', '#212B61', 55.594450246953066, 12.995781482931115),
(30, 16, 'Kopparbergs/Göteborg FC', 'media/SE/clubes/goteborg.avif', '#21A5EF', 57.719243915546414, 11.930605515844285),
(31, 16, 'FCR 2001 Duisburg', 'media/DE/clubes/old/duisburg.png', '#0C4011', 51.46249817136779, 6.702182571734334),
(32, 9, 'Standard Liege', 'media/BE/clubes/Royal_Standard_Liege.png', '#FFFFFF', 50.57573665089112, 5.5488020677229954),
(33, 16, 'VVV Venlo', 'media/NL/clubes/VVV Venlo.png', '#FFEA00', NULL, NULL),
(34, 6, 'SC Heerenveen', 'media/NL/clubes/SC_Heerenveen.png', '#0000CC', 52.958327473663694, 5.936810183344906),
(35, 16, 'UD Collerense', 'media/ES/clubes/collerense_ud.png', '#000080', NULL, NULL),
(36, 7, 'Fc Barcelona B', 'media/ES/clubes/barça b.png', '#A60042', NULL, NULL),
(37, 10, 'LSK Kvinner FK\r\n', 'media/NO/clubes/Lillestrøm_SK.png', '', NULL, NULL),
(38, 10, 'SK Trondheims', 'media/NO/clubes/old/sk-trondheims-orn.png', '', NULL, NULL),
(39, 11, 'Medyk Konin\r\n', 'media/PL/clubes/Medyk.png', '', NULL, NULL),
(40, 16, 'Tyresö FF\r\n', 'media/SE/clubes/Tyresö_FF.png', '', NULL, NULL),
(41, 10, 'Stabæk Kvinner', 'media/NO/clubes/Stabaek_IF.png', '', NULL, NULL),
(42, 8, 'Linköpings F. C.', 'media/SE/clubes/Linköpings_HC.png', '', NULL, NULL),
(43, 8, 'Jitex BK', 'media/SE/clubes/Jitex_BK.webp', '', NULL, NULL),
(44, 21, 'Zaragoza CFF', 'media/ES/clubes/zaragoza_cff.png', '#0055A0', NULL, NULL),
(45, 12, 'SL Benfica', 'media/PT/clubes/Benfica.png', '', NULL, NULL),
(46, 8, 'Eskilstuna United DFF', 'media/SE/clubes/Eskilstuna_United_DFF.png', '', NULL, NULL),
(47, 8, 'IK Uppsala Fotboll', 'media/SE/clubes/uppsala k.png', '', NULL, NULL),
(48, 8, 'Hammarby IF Fotbollförening', 'media/SE/clubes/Hammarby_IF.png', '#1A7812', NULL, NULL),
(49, 8, 'IK Sirius', 'media/SE/clubes/IK_Sirius.png', '', NULL, NULL),
(50, 8, 'Vaksala SK', 'media/SE/clubes/Vaksala.png', '', NULL, NULL),
(51, 8, 'Gamla Upsala SK', 'media/SE/clubes/Gamla_Upsala_SK.png', '', NULL, NULL),
(52, 21, 'CD Sporting de Huelva', 'media/ES/clubes/sporting-huelva.png', '#042FBF', NULL, NULL),
(53, 16, 'Real de Jaén', 'media/ES/clubes/jaen.png', '#9900CC', NULL, NULL),
(54, 16, 'Cádiz CF', 'media/ES/clubes/Cadiz_cf.png', '#FFFF00', NULL, NULL),
(55, 1, 'Levante de Badalona', 'media/ES/clubes/levante badalona.png', '#8F8F8F', 41.456856046966564, 2.2405832236406606),
(56, 4, 'En Avant de Guingamp', 'media/FR/clubes/EA_Guingamp.png', '', NULL, NULL),
(57, 4, 'ASJ Soyaux Charente', 'media/FR/clubes/ASJ_Soyaux-Charente.png', '', NULL, NULL),
(58, 16, 'Reading FC', 'media/ENG/clubes/Reading_FC.png', '', NULL, NULL),
(59, 21, 'Rayo Vallecano', 'media/ES/clubes/Rayo_Vallecano.png', '#FFFFFF', NULL, NULL),
(60, 21, 'Málaga CF', 'media/ES/clubes/Málaga_CF.png', '#3399FF', NULL, NULL),
(61, 2, 'Penn State', 'media/US/clubes/penn_state_football.png', '', NULL, NULL),
(62, 1, 'Alhama ELPOZO CF', 'media/ES/clubes/Alhama.png', '#2662BC', 37.841034763322796, -1.433396693573744),
(63, 16, 'SMX Athletic Club de Murcia', 'media/ES/clubes/SMX.png', '#067500', NULL, NULL),
(64, 13, 'SP Corinthians', 'media/BR/clubes/corinthians.png', '', NULL, NULL),
(65, 7, 'CF Cacereño Femenino', 'media/ES/clubes/Cacereño.png', '#009900', NULL, NULL),
(66, 14, 'Millonarios FC', 'media/CO/clubes/Millonarios.png', '', NULL, NULL),
(67, 14, 'Independiente de Santa Fe', 'media/CO/clubes/Independiente_Santa_Fe.png', '', NULL, NULL),
(68, 14, 'Atlético Huila', 'media/CO/clubes/Atlético_Huila.png', '', NULL, NULL),
(69, 14, 'Club Deportivo La Equidad', 'media/CO/clubes/Equidad.png', '', NULL, NULL),
(70, 6, 'FC Utrecht Vrouwen', 'media/NL/clubes/FC_Utrecht.png', '#FF0000', 52.074649735672125, 5.1467201562959),
(71, 2, 'San Diego Wave FC', 'media/US/clubes/San Diego.png', '', NULL, NULL),
(72, 2, 'Orlando Pride', 'media/US/clubes/Orlando_Pride.png', '', NULL, NULL),
(73, 5, 'Tottenham Hotspur', 'media/ENG/clubes/Tottenham_Hotspur.png', '#132257', NULL, NULL),
(74, 2, 'Portland Thorns FC', 'media/US/clubes/Portland_Thorns.png', '', NULL, NULL),
(75, 16, 'Seattle Sounders Women', 'media/US/clubes/old/Sounders-Women.png', '', NULL, NULL),
(76, 16, 'Western New York Flash', 'media/US/clubes/old/Western_New_York_Flash.png', '', NULL, NULL),
(77, 16, 'LA Blues', 'media/US/clubes/old/LA_BLUES.png', '', NULL, NULL),
(78, 1, 'Deportivo Abanca', 'media/ES/clubes/depor.png', '#57175e', 43.36844324686806, -8.417043853187),
(79, 1, 'Granada CF', 'media/ES/clubes/Granada.png', '#FF0000', 37.208376461135536, -3.596301205615327),
(80, 1, 'SD Eibar', 'media/ES/clubes/SD_Eibar.png', '#E01212', 43.18178032977114, -2.475877051533214),
(81, 1, 'Costa Adeje Tenerife\r\n', 'media/ES/clubes/costa adeje.png', '#0000FF', 28.463580734236945, -16.260358043141583),
(82, 16, 'FFC Frankfurt', 'media/DE/clubes/Eintracht_Frankfurt.png', '', NULL, NULL),
(83, 15, 'Leyendas', '', '#EFB810', 39.47740861072239, -0.3924929709250567),
(84, 15, 'Heroinas', NULL, '', NULL, NULL),
(85, 17, 'Roma', NULL, '', NULL, NULL),
(86, 17, 'Inter de Milán', NULL, '', NULL, NULL),
(87, 17, 'Fiorentina', NULL, '', NULL, NULL),
(88, 16, 'Milan', NULL, '', NULL, NULL),
(89, 17, 'Napoles', NULL, '', NULL, NULL),
(90, 5, 'Brighton', 'media/ENG/clubes/brighton.png', '#0057B8', NULL, NULL),
(91, 5, 'Everton', 'media/ENG/clubes/everton.png', '#003399', NULL, NULL),
(92, 17, 'Juventus', NULL, '', NULL, NULL),
(93, 18, 'FFC Turbine Potsdam', NULL, '#0057B8', NULL, NULL),
(94, 10, 'Kolbotn I. L', NULL, '', NULL, NULL),
(95, 18, 'MSV Duisburgo', NULL, '', NULL, NULL),
(96, 19, 'Club America', NULL, '', NULL, NULL),
(97, 2, 'Gotham FC', NULL, '', NULL, NULL),
(98, 20, 'Colo Colo', NULL, '', NULL, NULL),
(99, 17, 'FC Como', NULL, '', NULL, NULL),
(100, 17, 'Lazio', NULL, '', NULL, NULL),
(101, 19, 'Pachuca', NULL, '', NULL, NULL),
(102, 2, 'Houston Dash', NULL, '', NULL, NULL),
(103, 2, 'Utah Royals', NULL, '', NULL, NULL),
(104, 2, 'Seattle Reign', NULL, '', NULL, NULL),
(105, 2, 'Washington Spirit', NULL, '', NULL, NULL),
(106, 19, 'Monterrey', NULL, '', NULL, NULL),
(107, 1, 'DUX Logroño', 'media/ES/clubes/logronyo.png', '#660000', 42.45323926046034, -2.4533671760799876),
(108, 4, 'Montpellier', NULL, '', NULL, NULL),
(109, 5, 'London City Lionesses', 'media/ENG/clubes/london-city.png', '#00b0c7', NULL, NULL),
(110, 5, 'West Ham', 'media/ENG/clubes/west-ham.png', '#7A263A', NULL, NULL),
(111, 5, 'Liverpool', 'media/ENG/clubes/liverpool.png', '#c8102E', NULL, NULL),
(112, 19, 'Tigres de la UANL', NULL, '', NULL, NULL),
(113, 19, 'Pumas', NULL, '', NULL, NULL),
(114, 19, 'Pumas', NULL, '', NULL, NULL),
(115, 7, 'Osasuna', 'media/ES/clubes/osasuna.png', '#d91a21', NULL, NULL),
(116, 7, 'Alavés', 'media/ES/clubes/alaves.png', '#048FD9', NULL, NULL),
(117, 7, 'Fundación Albacete', 'media/ES/clubes/alba.png', '#FFFFFF', NULL, NULL),
(118, 7, 'AEM SE Lleida', 'media/ES/clubes/aem.png', '#0000FF', NULL, NULL),
(119, 7, 'Real Oviedo Femenino', 'media/ES/clubes/oviedo.png', '#0066FF', NULL, NULL),
(120, 7, 'CE Europa', 'media/ES/clubes/europa.png', '#0000FF', NULL, NULL),
(121, 21, 'Bizkerre', NULL, '', NULL, NULL),
(122, 22, 'Añorga', NULL, '', NULL, NULL),
(123, 21, 'Racing Féminas', NULL, '', NULL, NULL),
(124, 5, 'Leicester', 'media/ENG/clubes/leicester.png', '#0053A0', NULL, NULL),
(125, 23, 'Charlton Athletic', 'media/ENG/clubes/charlton.png', '#D6011D', NULL, NULL),
(126, 23, 'Birmingham City', 'media/ENG/clubes/birmingham.png', '#0000FF', NULL, NULL),
(127, 23, 'Bristol City', 'media/ENG/clubes/bristol.png', '#E21A23', NULL, NULL),
(128, 23, 'Crystal Palace', 'media/ENG/clubes/crystal.png', '#1B458F', NULL, NULL),
(129, 23, 'Southampton', 'media/ENG/clubes/southampton.png', '#FF0033', NULL, NULL),
(130, 23, 'Newcastle United', 'media/ENG/clubes/newcastle.png', '#000000', NULL, NULL),
(131, 23, 'Nottingham Forest', 'media/ENG/clubes/forest.png', '#C8102E', NULL, NULL),
(132, 23, 'Sunderland', 'media/ENG/clubes/sunderland.png', '#EB172C', NULL, NULL),
(133, 23, 'Durham', 'media/ENG/clubes/durham.png', '#2154CB', NULL, NULL),
(134, 23, 'Sheffield United', 'media/ENG/clubes/sheffield.png', '#EC2227', NULL, NULL),
(135, 23, 'Portsmouth', 'media/ENG/clubes/portsmouth.png', '#0754ED', NULL, NULL),
(136, 23, 'Ipswich Town', 'media/ENG/clubes/ipswich.png', '#212B61', NULL, NULL),
(137, 7, 'Atlético B', 'media/ES/clubes/Atletico_Madrid.png', '#CB3524', NULL, NULL),
(138, 7, 'Real Madrid B', 'media/ES/clubes/Real_Madrid.png', '#FEBE10', NULL, NULL),
(139, 7, 'Costa Adeje Tenerife B\r\n', 'media/ES/clubes/costa adeje.png', '#0000FF', NULL, NULL),
(140, 6, 'Ado den Haag', 'media/NL/clubes/ado.png', '#006600', 52.06291769693645, 4.382220627460048),
(141, 6, 'AZ Alkmaar', 'media/NL/clubes/az.png', '#FF0000', 52.473224621870216, 4.847084450209234),
(142, 6, 'Excelsior', 'media/NL/clubes/excelsior.png', '#000000', 51.91715184065112, 4.5189649544400075),
(143, 6, 'Feyenoord', 'media/NL/clubes/feyenoord.png', '#FF0808', 51.8896231025571, 4.524903026420365),
(144, 6, 'Hera United', 'media/NL/clubes/hera.png', '#033685', 52.337737779820365, 4.882763682725908),
(145, 6, 'NAC Breda', 'media/NL/clubes/nac.png', '#F7EA36', 51.47807747908085, 4.701818836912487),
(146, 6, 'PEC Zwolle', 'media/NL/clubes/pec.png', '#2D2DD4', 52.517615397842306, 6.121674589804143),
(147, 3, 'Werder Bremen', 'media/DE/clubes/bremen.png', '#00924A', NULL, NULL),
(148, 3, 'Hoffenheim', 'media/DE/clubes/hoffenheim.png', '#0033CC', NULL, NULL),
(149, 3, 'Freiburg', 'media/DE/clubes/freiburg.png', '#FF0000', NULL, NULL),
(150, 3, 'FC Koln', 'media/DE/clubes/koln.png', '#ED1C23', NULL, NULL),
(151, 3, 'Union Berlin', 'media/DE/clubes/union.png', '#E40019', NULL, NULL),
(152, 3, 'Nurnberg', 'media/DE/clubes/nurnberg.png', '#990000', NULL, NULL),
(153, 3, 'RB Leizpig', 'media/DE/clubes/leipzig.png', '#D50031', NULL, NULL),
(154, 3, 'Hamburg', 'media/DE/clubes/hamburg.png', '#014495', NULL, NULL),
(157, 3, 'Essen', 'media/DE/clubes/essen.png', '#660066', NULL, NULL),
(158, 3, 'Jena', 'media/DE/clubes/jena.png', '#0F59FA', NULL, NULL),
(159, 18, 'Wolfsburg II', 'media/DE/clubes/VfL_Wolfsburg.png', '#65B32E', NULL, NULL),
(160, 18, 'FC Bayern II', 'media/DE/clubes/FC_Bayern_München.png', '#0066b2', NULL, NULL),
(161, 18, 'Eintracht II', 'media/DE/clubes/Eintracht_Frankfurt.png', '#E1000F', NULL, NULL),
(162, 24, 'Servette FC Chênois Féminin', 'media/SUI/equipos/Servette.png', '#870E26', 46.17857656071011, 6.123409844349157),
(163, 10, 'Valerenga', 'media/NO/clubes/valerenga.png', '#0000FF', 59.91788813285858, 10.806728473558952),
(164, 8, 'Malmo FF', 'media/SE/clubes/malmo.png', '#81C0FF', 55.58608282351136, 12.989253489613224),
(165, 12, 'Sporting Braga', 'media/PT/clubes/braga.png', '#E80C0C', 41.5388688145551, -8.420595327253368);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

CREATE TABLE `juegos` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `slug` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`id`, `nombre`, `slug`) VALUES
(1, 'Gues Trayectoria', ''),
(2, 'Wordle', '2'),
(3, 'Guess Jugadora', '3'),
(4, 'Futfem Grid', '4'),
(5, 'Futfem Mates', '5'),
(6, 'Futfem Bingo', '6'),
(7, 'Higher or Lower', 'HoL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadora-pais`
--

CREATE TABLE `jugadora-pais` (
  `id` int(11) NOT NULL,
  `jugadora` int(11) NOT NULL,
  `pais` int(11) NOT NULL,
  `es_primaria` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `jugadora-pais`
--

INSERT INTO `jugadora-pais` (`id`, `jugadora`, `pais`, `es_primaria`) VALUES
(1, 3, 1, 1),
(2, 4, 1, 1),
(3, 5, 1, 1),
(4, 6, 1, 1),
(5, 7, 1, 1),
(6, 8, 1, 1),
(7, 9, 1, 1),
(8, 10, 1, 1),
(9, 11, 1, 1),
(10, 12, 1, 1),
(11, 13, 1, 1),
(12, 16, 1, 1),
(13, 20, 1, 1),
(14, 21, 1, 1),
(15, 23, 1, 1),
(16, 26, 1, 1),
(17, 27, 1, 1),
(18, 28, 1, 1),
(19, 29, 1, 1),
(20, 30, 1, 1),
(21, 32, 1, 1),
(22, 33, 1, 1),
(23, 34, 1, 1),
(24, 36, 1, 1),
(25, 37, 1, 1),
(26, 38, 1, 1),
(27, 39, 1, 1),
(28, 40, 1, 1),
(29, 42, 1, 1),
(30, 46, 1, 1),
(31, 47, 1, 1),
(32, 48, 1, 1),
(33, 49, 1, 1),
(34, 50, 1, 1),
(35, 52, 1, 1),
(36, 53, 1, 1),
(37, 54, 1, 1),
(38, 60, 1, 1),
(39, 61, 1, 1),
(40, 62, 1, 1),
(41, 67, 1, 1),
(42, 68, 1, 1),
(43, 72, 1, 1),
(44, 74, 1, 1),
(45, 77, 1, 1),
(46, 78, 1, 1),
(47, 81, 1, 1),
(48, 82, 1, 1),
(49, 83, 1, 1),
(50, 84, 1, 1),
(51, 85, 1, 1),
(52, 86, 1, 1),
(53, 87, 1, 1),
(54, 88, 1, 1),
(55, 89, 1, 1),
(56, 91, 1, 1),
(57, 92, 1, 1),
(58, 93, 1, 1),
(59, 95, 1, 1),
(60, 96, 1, 1),
(61, 97, 1, 1),
(62, 98, 1, 1),
(63, 99, 1, 1),
(64, 100, 1, 1),
(65, 101, 1, 1),
(66, 102, 1, 1),
(67, 103, 1, 1),
(68, 104, 1, 1),
(69, 105, 1, 1),
(70, 106, 1, 1),
(71, 107, 1, 1),
(72, 108, 1, 1),
(73, 109, 1, 1),
(74, 110, 1, 1),
(75, 111, 1, 1),
(76, 112, 1, 1),
(77, 113, 1, 1),
(78, 114, 1, 1),
(79, 116, 1, 1),
(80, 117, 1, 1),
(81, 119, 1, 1),
(82, 120, 1, 1),
(83, 121, 1, 1),
(84, 122, 1, 1),
(85, 123, 1, 1),
(86, 125, 1, 1),
(87, 126, 1, 1),
(88, 127, 1, 1),
(89, 128, 1, 1),
(90, 129, 1, 1),
(91, 130, 1, 1),
(92, 132, 1, 1),
(93, 135, 1, 1),
(94, 136, 1, 1),
(95, 138, 1, 1),
(96, 139, 1, 1),
(97, 140, 1, 1),
(98, 142, 1, 1),
(99, 143, 1, 1),
(100, 145, 1, 1),
(101, 148, 1, 1),
(102, 151, 1, 1),
(103, 152, 1, 1),
(104, 154, 1, 1),
(105, 157, 1, 1),
(106, 159, 1, 1),
(107, 160, 1, 1),
(108, 161, 1, 1),
(109, 162, 1, 1),
(110, 163, 1, 1),
(111, 164, 1, 1),
(112, 165, 1, 1),
(113, 166, 1, 1),
(114, 168, 1, 1),
(115, 169, 1, 1),
(116, 170, 1, 1),
(117, 171, 1, 1),
(118, 172, 1, 1),
(119, 174, 1, 1),
(120, 176, 56, 1),
(121, 179, 1, 1),
(122, 180, 1, 1),
(123, 181, 1, 1),
(124, 183, 1, 1),
(125, 185, 1, 1),
(126, 186, 1, 1),
(127, 187, 1, 1),
(128, 188, 1, 1),
(129, 189, 1, 1),
(130, 190, 1, 1),
(131, 191, 1, 1),
(132, 193, 1, 1),
(133, 194, 1, 1),
(134, 195, 1, 1),
(135, 196, 1, 1),
(136, 197, 1, 1),
(137, 199, 1, 1),
(138, 200, 1, 1),
(139, 202, 1, 1),
(140, 203, 1, 1),
(141, 204, 1, 1),
(142, 207, 1, 1),
(143, 208, 1, 1),
(144, 209, 1, 1),
(145, 210, 1, 1),
(146, 211, 1, 1),
(147, 212, 1, 1),
(148, 214, 1, 1),
(149, 215, 1, 1),
(150, 216, 1, 1),
(151, 217, 1, 1),
(152, 218, 1, 1),
(153, 219, 1, 1),
(154, 220, 1, 1),
(155, 222, 1, 1),
(156, 223, 1, 1),
(157, 225, 1, 1),
(158, 226, 1, 1),
(159, 227, 1, 1),
(160, 228, 1, 1),
(161, 229, 1, 1),
(162, 230, 1, 1),
(163, 232, 1, 1),
(164, 233, 1, 1),
(165, 234, 1, 1),
(166, 237, 1, 1),
(167, 240, 1, 1),
(168, 241, 1, 1),
(169, 243, 1, 1),
(170, 244, 1, 1),
(171, 245, 1, 1),
(172, 246, 1, 1),
(173, 247, 1, 1),
(174, 248, 1, 1),
(175, 249, 1, 1),
(176, 250, 1, 1),
(177, 251, 1, 1),
(178, 252, 1, 1),
(179, 253, 1, 1),
(180, 254, 1, 1),
(181, 256, 1, 1),
(182, 257, 1, 1),
(183, 258, 1, 1),
(184, 259, 1, 1),
(185, 260, 1, 1),
(186, 262, 1, 1),
(187, 263, 1, 1),
(188, 264, 1, 1),
(189, 266, 1, 1),
(190, 267, 1, 1),
(191, 269, 1, 1),
(192, 270, 1, 1),
(193, 271, 1, 1),
(194, 290, 1, 1),
(195, 291, 1, 1),
(196, 292, 1, 1),
(197, 293, 1, 1),
(198, 294, 1, 1),
(199, 297, 1, 1),
(200, 298, 1, 1),
(201, 299, 1, 1),
(202, 300, 1, 1),
(203, 302, 1, 1),
(204, 305, 1, 1),
(205, 308, 1, 1),
(206, 309, 1, 1),
(207, 310, 1, 1),
(208, 311, 1, 1),
(209, 312, 1, 1),
(210, 313, 1, 1),
(211, 314, 1, 1),
(212, 315, 1, 1),
(213, 316, 1, 1),
(214, 318, 1, 1),
(215, 319, 1, 1),
(216, 320, 1, 1),
(217, 321, 1, 1),
(218, 323, 1, 1),
(219, 326, 1, 1),
(220, 328, 1, 1),
(221, 329, 1, 1),
(222, 330, 1, 1),
(223, 331, 1, 1),
(224, 332, 1, 1),
(225, 333, 1, 1),
(226, 334, 1, 1),
(227, 338, 1, 1),
(228, 339, 1, 1),
(229, 345, 1, 1),
(230, 346, 1, 1),
(231, 347, 1, 1),
(232, 348, 1, 1),
(233, 349, 1, 1),
(234, 352, 1, 1),
(235, 354, 1, 1),
(236, 355, 1, 1),
(237, 356, 1, 1),
(238, 357, 1, 1),
(239, 358, 1, 1),
(240, 359, 1, 1),
(241, 360, 1, 1),
(242, 361, 1, 1),
(243, 362, 1, 1),
(244, 365, 1, 1),
(245, 366, 1, 1),
(246, 367, 1, 1),
(247, 369, 1, 1),
(248, 370, 1, 1),
(249, 371, 1, 1),
(250, 372, 1, 1),
(251, 373, 1, 1),
(252, 386, 1, 1),
(253, 387, 1, 1),
(254, 388, 1, 1),
(255, 389, 1, 1),
(256, 391, 1, 1),
(257, 392, 1, 1),
(258, 393, 1, 1),
(259, 394, 1, 1),
(260, 395, 1, 1),
(261, 396, 1, 1),
(262, 397, 1, 1),
(263, 398, 1, 1),
(264, 399, 1, 1),
(265, 400, 1, 1),
(266, 401, 1, 1),
(267, 402, 1, 1),
(268, 403, 1, 1),
(269, 404, 1, 1),
(270, 405, 1, 1),
(271, 406, 1, 1),
(272, 407, 1, 1),
(273, 408, 1, 1),
(274, 409, 1, 1),
(275, 410, 1, 1),
(276, 411, 1, 1),
(277, 412, 1, 1),
(278, 414, 1, 1),
(279, 415, 1, 1),
(280, 416, 1, 1),
(281, 417, 1, 1),
(282, 418, 1, 1),
(283, 419, 1, 1),
(284, 420, 1, 1),
(285, 421, 1, 1),
(286, 422, 1, 1),
(287, 423, 1, 1),
(288, 424, 1, 1),
(289, 425, 1, 1),
(290, 426, 1, 1),
(291, 427, 1, 1),
(292, 428, 1, 1),
(293, 431, 1, 1),
(294, 432, 1, 1),
(295, 477, 1, 1),
(296, 2, 2, 1),
(297, 15, 2, 1),
(298, 213, 2, 1),
(299, 375, 2, 1),
(300, 456, 2, 1),
(301, 458, 2, 1),
(302, 460, 2, 1),
(303, 462, 2, 1),
(304, 467, 2, 1),
(305, 14, 3, 1),
(306, 18, 3, 1),
(307, 57, 3, 1),
(308, 63, 3, 1),
(309, 351, 3, 1),
(310, 438, 3, 1),
(311, 76, 41, 1),
(312, 115, 4, 1),
(313, 137, 4, 1),
(314, 141, 4, 1),
(315, 149, 4, 1),
(316, 156, 4, 1),
(317, 235, 4, 1),
(318, 317, 4, 1),
(319, 376, 4, 1),
(320, 429, 4, 1),
(321, 441, 4, 1),
(322, 444, 4, 1),
(323, 445, 4, 1),
(324, 447, 4, 1),
(325, 448, 4, 1),
(326, 450, 4, 1),
(327, 459, 4, 1),
(328, 468, 4, 1),
(329, 205, 6, 1),
(330, 306, 6, 1),
(331, 390, 6, 1),
(332, 469, 6, 1),
(333, 1, 7, 1),
(334, 24, 7, 1),
(335, 44, 7, 1),
(336, 301, 7, 1),
(337, 381, 7, 1),
(338, 382, 7, 1),
(339, 383, 7, 1),
(340, 384, 7, 1),
(341, 437, 7, 1),
(342, 449, 7, 1),
(343, 453, 7, 1),
(344, 466, 7, 1),
(345, 474, 7, 1),
(346, 475, 7, 1),
(347, 476, 7, 1),
(348, 272, 8, 1),
(349, 430, 8, 1),
(350, 465, 8, 1),
(351, 265, 9, 1),
(352, 336, 9, 1),
(353, 440, 11, 1),
(354, 439, 12, 1),
(355, 17, 14, 1),
(356, 79, 14, 1),
(357, 177, 14, 1),
(358, 377, 14, 1),
(359, 56, 15, 1),
(360, 94, 15, 1),
(361, 146, 15, 1),
(362, 451, 15, 1),
(363, 452, 15, 1),
(364, 19, 16, 1),
(365, 25, 16, 1),
(366, 150, 16, 1),
(367, 340, 16, 1),
(368, 455, 16, 1),
(369, 472, 16, 1),
(370, 473, 16, 1),
(371, 153, 17, 1),
(372, 155, 17, 1),
(373, 344, 17, 1),
(374, 436, 17, 1),
(375, 463, 17, 1),
(376, 45, 18, 1),
(377, 71, 18, 1),
(378, 446, 18, 1),
(379, 133, 19, 1),
(380, 173, 20, 1),
(381, 304, 20, 1),
(382, 413, 21, 1),
(383, 31, 22, 1),
(384, 59, 22, 1),
(385, 198, 22, 1),
(386, 364, 22, 1),
(387, 368, 22, 1),
(388, 443, 23, 1),
(389, 457, 23, 1),
(390, 471, 23, 1),
(391, 307, 24, 1),
(392, 69, 25, 1),
(393, 175, 25, 1),
(394, 184, 25, 1),
(395, 342, 25, 1),
(396, 435, 25, 1),
(397, 43, 26, 1),
(398, 118, 26, 1),
(399, 124, 26, 1),
(400, 158, 26, 1),
(401, 231, 26, 1),
(402, 461, 26, 1),
(403, 41, 27, 1),
(404, 51, 27, 1),
(405, 58, 27, 1),
(406, 65, 27, 1),
(407, 66, 27, 1),
(408, 90, 27, 1),
(409, 144, 27, 1),
(410, 201, 27, 1),
(411, 255, 27, 1),
(412, 335, 27, 1),
(413, 350, 27, 1),
(414, 363, 27, 1),
(415, 433, 27, 1),
(416, 434, 27, 1),
(417, 322, 28, 1),
(418, 337, 28, 1),
(419, 343, 28, 1),
(420, 35, 30, 1),
(421, 70, 30, 1),
(422, 75, 30, 1),
(423, 178, 30, 1),
(424, 224, 30, 1),
(425, 325, 30, 1),
(426, 378, 30, 1),
(427, 206, 32, 1),
(428, 303, 33, 1),
(429, 327, 33, 1),
(430, 374, 33, 1),
(431, 239, 34, 1),
(432, 64, 36, 1),
(433, 131, 36, 1),
(434, 268, 36, 1),
(435, 379, 36, 1),
(436, 324, 37, 1),
(437, 261, 38, 1),
(438, 442, 39, 1),
(439, 464, 39, 1),
(440, 22, 41, 1),
(441, 55, 41, 1),
(442, 80, 41, 1),
(443, 167, 41, 1),
(444, 182, 41, 1),
(445, 238, 41, 1),
(446, 134, 42, 1),
(447, 221, 42, 1),
(448, 353, 42, 1),
(449, 147, 43, 1),
(450, 192, 44, 1),
(451, 236, 45, 1),
(452, 295, 45, 1),
(453, 296, 46, 1),
(454, 341, 47, 1),
(455, 454, 47, 1),
(456, 380, 48, 1),
(457, 242, 49, 1),
(458, 73, 51, 1),
(516, 381, 48, 0),
(517, 24, 52, 0),
(518, 455, 53, 0),
(519, 472, 54, 0),
(520, 437, 1, 0),
(521, 21, 55, 0),
(522, 16, 36, 0),
(523, 272, 18, 0),
(524, 60, 28, 0),
(525, 65, 18, 0),
(526, 94, 1, 0),
(527, 377, 1, 0),
(528, 176, 1, 0),
(529, 89, 18, 0),
(530, 76, 4, 0),
(531, 456, 1, 0),
(532, 478, 7, 1),
(533, 479, 7, 1),
(534, 480, 7, 1),
(535, 481, 7, 1),
(536, 482, 7, 1),
(537, 483, 7, 1),
(538, 484, 1, 1),
(539, 485, 1, 1),
(540, 486, 1, 1),
(541, 494, 3, 1),
(542, 495, 1, 1),
(543, 497, 1, 1),
(544, 497, 28, 0),
(545, 498, 1, 1),
(546, 499, 41, 1),
(547, 500, 1, 1),
(548, 496, 1, 1),
(549, 501, 16, 1),
(550, 502, 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadora-trofeo`
--

CREATE TABLE `jugadora-trofeo` (
  `id` int(11) NOT NULL,
  `jugadora` int(11) NOT NULL,
  `trofeo` int(11) NOT NULL,
  `temporada` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `jugadora-trofeo`
--

INSERT INTO `jugadora-trofeo` (`id`, `jugadora`, `trofeo`, `temporada`) VALUES
(1, 1, 3, '2017'),
(2, 1, 4, '2017');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadoras`
--

CREATE TABLE `jugadoras` (
  `id_jugadora` int(11) NOT NULL,
  `Nombre` text NOT NULL,
  `Apellidos` text NOT NULL,
  `Apodo` text NOT NULL,
  `Nacimiento` date NOT NULL,
  `Posicion` int(2) NOT NULL DEFAULT 13,
  `imagen` text DEFAULT NULL,
  `altura` double DEFAULT NULL,
  `pie_habil` text DEFAULT NULL,
  `market_value` double DEFAULT NULL,
  `soccerdonna_url` text DEFAULT NULL,
  `retiro` year(4) DEFAULT NULL,
  `soccerdonna_last_updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `jugadoras`
--

INSERT INTO `jugadoras` (`id_jugadora`, `Nombre`, `Apellidos`, `Apodo`, `Nacimiento`, `Posicion`, `imagen`, `altura`, `pie_habil`, `market_value`, `soccerdonna_url`, `retiro`, `soccerdonna_last_updated`) VALUES
(1, 'Lieke Elisabeth Petronella', 'Martens', 'Lieke', '1992-12-16', 11, 'media/NL/jugadoras/likitaaa.png', 170, 'right', NULL, 'https://www.soccerdonna.de/de/lieke-martens-van-leer/profil/spieler_2515.html', '2025', '2026-02-13 23:48:20'),
(2, 'Ellie', 'Roebuck', 'Ellie', '1999-09-23', 1, 'media/ENG/jugadoras/ellieee.png', 174, 'right', 60000, 'https://www.soccerdonna.de/de/ellie-roebuck/profil/spieler_30417.html', NULL, '2026-02-13 23:48:20'),
(3, 'Cata', 'Thomas Coll Lluch', 'Cata', '2001-04-23', 1, 'media/ES/jugadoras/cata.png', 170, 'right', 240000, 'https://www.soccerdonna.de/de/cata-coll/profil/spieler_30425.html', NULL, '2026-02-13 23:48:21'),
(4, 'Gemma', 'Font Oliveras', 'Gemma', '1999-11-07', 1, 'media/ES/jugadoras/gemma.png', 165, 'right', 50000, 'https://www.soccerdonna.de/de/gemma-font/profil/spieler_38461.html', NULL, '2026-02-13 23:48:21'),
(5, 'Irene', 'Paredes Hernández', 'Irene', '1991-07-04', 3, 'media/ES/jugadoras/paredes.png', 178, 'right', 275000, 'https://www.soccerdonna.de/de/irene-paredes/profil/spieler_3708.html', NULL, '2026-02-13 23:48:22'),
(6, 'Marta', 'Torrejón Moya', 'Torre', '1990-02-27', 2, 'media/ES/jugadoras/torrejon.png', 171, 'right', 50000, 'https://www.soccerdonna.de/de/marta-torrejon/profil/spieler_3230.html', NULL, '2026-02-13 23:48:22'),
(7, 'Mapi', 'León Cebrián', 'Mapi', '1995-06-13', 3, 'media/ES/jugadoras/mapi.png', 169, 'left', 725000, 'https://www.soccerdonna.de/de/maria-leon/profil/spieler_22100.html', NULL, '2026-02-13 23:48:23'),
(8, 'Ona', 'Batlle Pascual', 'Ona', '1999-06-10', 2, 'media/ES/jugadoras/ona.png', 165, 'right', 800000, 'https://www.soccerdonna.de/de/ona-batlle/profil/spieler_30423.html', NULL, '2026-02-13 23:48:23'),
(9, 'Jana', 'Fernández Velasco', 'Jana', '2002-02-18', 3, 'media/ES/jugadoras/jana.png', 162, 'right', 300000, 'https://www.soccerdonna.de/de/jana-fernandez/profil/spieler_35181.html', NULL, '2026-02-13 23:48:24'),
(10, 'Martina', 'Fernández Vila', 'Martina', '2004-10-01', 3, 'media/ES/jugadoras/martina.png', 168, 'right', 60000, 'https://www.soccerdonna.de/en/martina-fernandez/profil/spieler_48781.html', NULL, '2026-02-13 23:48:24'),
(11, 'Alexia', 'Putellas Segura', 'Alexia', '1994-02-04', 5, 'media/ES/jugadoras/alexia.png', 173, 'left', 1200000, 'https://www.soccerdonna.de/de/alexia-putellas/profil/spieler_4824.html', NULL, '2026-02-13 23:48:24'),
(12, 'Patricia', 'Guijarro Gutiérrez', 'Patri', '1998-05-17', 6, 'media/ES/jugadoras/patri.png', 170, 'right', 1250000, 'https://www.soccerdonna.de/de/patri-guijarro/profil/spieler_21948.html', NULL, '2026-02-13 23:48:25'),
(13, 'Aitana', 'Bonmatí Conca', 'Aitana', '1998-01-18', 5, 'media/ES/jugadoras/aitana.png', 161, 'right', 1600000, 'https://www.soccerdonna.de/de/aitana-bonmati/profil/spieler_22156.html', NULL, '2026-02-13 23:48:25'),
(14, 'Ingrid Syrstad', 'Engen', 'Engen', '1998-04-29', 6, 'media/NO/jugadoras/ingrid.png', 177, 'right', 500000, 'https://www.soccerdonna.de/de/ingrid-engen/profil/spieler_27871.html', '0000', '2026-02-13 23:48:26'),
(15, 'Keira', 'Walsh', 'Keira', '1997-04-08', 6, 'media/ENG/jugadoras/keira.png', 167, 'right', 650000, 'https://www.soccerdonna.de/de/keira-walsh/profil/spieler_22178.html', NULL, '2026-02-13 23:48:26'),
(16, 'Victoria', 'López Serrano Felix', 'Vicky', '2006-07-26', 7, 'media/ES/jugadoras/vicky lopez.png', 161, 'right', 800000, 'https://www.soccerdonna.de/de/vicky-lopez/profil/spieler_62819.html', '0000', '2026-02-13 23:48:27'),
(17, 'Ewa', 'Pajor', 'Pajor', '1996-12-03', 10, 'media/PL/jugadoras/Ewa Pajor.png', 167, 'right', 1200000, 'https://www.soccerdonna.de/de/ewa-pajor/profil/spieler_22010.html', NULL, '2026-02-13 23:48:27'),
(18, 'Caroline', 'Graham Hansen', 'Hansen', '1995-02-18', 12, 'media/NO/jugadoras/hansen.png', 175, 'right', 1100000, 'https://www.soccerdonna.de/de/caroline-graham/profil/spieler_6143.html', NULL, '2026-02-13 23:48:27'),
(19, 'Fridolina', 'Rolfö', 'Frido', '1993-11-24', 4, 'media/SE/jugadoras/frido.png', 178, 'left', 450000, 'https://www.soccerdonna.de/de/fridolina-rolfoe/profil/spieler_7753.html', NULL, '2026-02-13 23:48:28'),
(20, 'Claudia', 'Pina Medina', 'Pina', '2001-08-12', 7, 'media/ES/jugadoras/pina.png', 165, 'right', 1200000, 'https://www.soccerdonna.de/de/claudia-pina/profil/spieler_35758.html', NULL, '2026-02-13 23:48:28'),
(21, 'Salma Celeste', 'Paralluelo Ayingono', 'Salma', '2003-11-13', 11, 'media/ES/jugadoras/salma.png', 174, 'left', 750000, 'https://www.soccerdonna.de/de/salma-paralluelo/profil/spieler_35179.html', '0000', '2026-02-13 23:48:29'),
(22, 'Kika', 'Ramos Ribeiro Nazareth Sousa', 'Kika', '2002-11-17', 7, 'media/PT/jugadoras/kika.png', 168, 'right', 700000, 'https://www.soccerdonna.de/de/kika-nazareth/profil/spieler_40313.html', NULL, '2026-02-13 23:48:29'),
(23, 'Érika', 'González Lombídez', 'Érika ', '2004-08-31', 7, 'media/ES/jugadoras/eriii.png', 168, 'right', 70000, 'https://www.soccerdonna.de/en/rika-gonzalez/profil/spieler_49252.html', NULL, '2026-02-13 23:48:30'),
(24, 'Esmee', 'Brugts', 'Esmee', '2003-07-28', 12, 'media/NL/jugadoras/esmeeee.png', 171, 'right', 550000, 'https://www.soccerdonna.de/de/esmee-brugts/profil/spieler_38418.html', '0000', '2026-02-13 23:48:30'),
(25, 'Emma Ida Emilia', 'Holmgren', 'Emma', '1997-05-13', 1, 'media/SE/jugadoras/emmaaa.png', 171, 'right', 50000, 'https://www.soccerdonna.de/de/emma-holmgren/profil/spieler_30114.html', NULL, '2026-02-13 23:48:31'),
(26, 'Andrea', 'Tarazona Brisa', 'Tarazona', '2004-03-21', 1, 'media/ES/jugadoras/taraa.png', 168, 'right', 45000, 'https://www.soccerdonna.de/en/andrea-tarazona/profil/spieler_50332.html', NULL, '2026-02-13 23:48:31'),
(27, 'María De Alharilla', 'Casado Morente', 'Alharilla', '1990-11-13', 2, 'media/ES/jugadoras/alhaa.png', 164, 'right', 25000, 'https://www.soccerdonna.de/en/alharilla-casado/profil/spieler_4241.html', NULL, '2026-02-13 23:48:31'),
(28, 'María', 'Molina Molero', 'Moli', '2000-05-09', 3, 'media/ES/jugadoras/moli.png', 173, 'right', 50000, 'https://www.soccerdonna.de/de/maria-molina/profil/spieler_48787.html', NULL, '2026-02-13 23:48:32'),
(29, 'Teresa', 'Mérida Cañete', 'Tere', '2002-07-17', 3, 'media/ES/jugadoras/tere merida.png', 169, 'right', 45000, 'https://www.soccerdonna.de/en/teresa-merida/profil/spieler_35185.html', NULL, '2026-02-13 23:48:32'),
(30, 'Estela', 'Carbonell Núñez', 'Estela', '2004-10-18', 4, 'media/ES/jugadoras/estelita.png', 169, 'left', 120000, 'https://www.soccerdonna.de/de/estela-carbonell/profil/spieler_50367.html', NULL, '2026-02-13 23:48:33'),
(31, 'Raiderlin Nazareth', 'Carrasco Vargas', 'Rai', '2002-06-11', 4, 'media/VE/jugadoras/raii.png', 159, 'left', 30000, 'https://www.soccerdonna.de/en/raiderlin-carrasco/profil/spieler_54912.html', NULL, '2026-02-13 23:48:33'),
(32, 'Nuria', 'Escoms García', 'Escoms', '2006-08-15', 5, 'media/ES/jugadoras/escoms.png', 166, 'left', 25000, 'https://www.soccerdonna.de/en/nuria-escoms/profil/spieler_73262.html', NULL, '2026-02-13 23:48:34'),
(33, 'María', 'Gabaldón Romero', 'Gabal', '2003-11-11', 3, 'media/ES/jugadoras/gabal.png', 164, 'right', 40000, 'https://www.soccerdonna.de/en/maria-gabaldon/profil/spieler_59276.html', NULL, '2026-02-13 23:48:34'),
(34, 'Ángela', 'Sosa Martín', 'Sosa', '1993-01-16', 7, 'media/ES/jugadoras/sosaa.png', 166, 'right', 60000, 'https://www.soccerdonna.de/de/ngela-sosa/profil/spieler_3678.html', NULL, '2026-02-13 23:48:35'),
(35, 'Anissa', 'Lahmari', 'Lahmari', '1997-02-17', 5, 'media/MA/jugadoras/anissa.png', 166, 'right', 35000, 'https://www.soccerdonna.de/de/anissa-lahmari/profil/spieler_22125.html', NULL, '2026-02-13 23:48:35'),
(36, 'Paula', 'Fernández Jiménez', 'Paufer', '1999-07-01', 5, 'media/ES/jugadoras/paufer.png', 169, 'both', 85000, 'https://www.soccerdonna.de/de/paula-fernandez/profil/spieler_30428.html', NULL, '2026-02-13 23:48:36'),
(37, 'Anna', 'Torrodá Ricart', 'Torro', '2000-01-21', 6, 'media/ES/jugadoras/torro.png', 163, 'right', 60000, 'https://www.soccerdonna.de/de/anna-torroda/profil/spieler_35561.html', NULL, '2026-02-13 23:48:36'),
(38, 'Ainhoa', 'Estévez Bascuñán', 'Bascu', '2004-02-23', 5, 'media/ES/jugadoras/bascu.png', 169, 'right', 30000, 'https://www.soccerdonna.de/en/ainhoa-bascuan/profil/spieler_50369.html', NULL, '2026-02-13 23:48:36'),
(39, 'Eva', 'Alonso González', 'Eva', '2002-07-23', 6, 'media/ES/jugadoras/evaa.png', 165, 'right', 40000, 'https://www.soccerdonna.de/en/eva-alonso/profil/spieler_37845.html', NULL, '2026-02-13 23:48:37'),
(40, 'Daniela', 'Arques Lázaro', 'Dani', '2006-03-21', 5, 'media/ES/jugadoras/daniela.png', 169, 'right', 70000, 'https://www.soccerdonna.de/de/daniela-arques/profil/spieler_63183.html', NULL, '2026-02-13 23:48:37'),
(41, 'Gabriela', 'Nunes Da Silva', 'Gabi Nunes', '1997-03-10', 10, 'media/BR/jugadoras/gabi.png', 170, 'left', 190000, 'https://www.soccerdonna.de/de/gabi-nunes/profil/spieler_32162.html', NULL, '2026-02-13 23:48:38'),
(42, 'Ana', 'Franco', 'Ana Franco', '1999-06-06', 8, 'media/ES/jugadoras/ana franco.png', 174, 'right', 35000, 'https://www.soccerdonna.de/en/ana-franco/profil/spieler_40260.html', NULL, '2026-02-13 23:48:38'),
(43, 'Ivonne', 'Chacón', 'Chacón', '1997-10-12', 10, 'media/CO/jugadoras/ivonne.png', 179, 'right', 60000, 'https://www.soccerdonna.de/en/ivonne-chacon/profil/spieler_65601.html', NULL, '2026-02-13 23:48:39'),
(44, 'Sari', 'van Veenendaal', 'Sari', '1990-04-03', 1, 'media/NL/jugadoras/sari.png', 180, 'right', NULL, 'https://www.soccerdonna.de/en/sari-van-veenendaal/profil/spieler_2732.html', '2022', '2026-02-13 23:48:39'),
(45, 'Alexandra Patricia', 'Morgan', 'Morgan', '1989-07-02', 10, 'media/US/jugadoras/alex-morgan.png', 170, 'left', NULL, 'https://www.soccerdonna.de/en/alex-morgan/profil/spieler_2514.html', '2024', '2026-02-13 23:48:40'),
(46, 'Dolores', 'Gallardo Núñez', 'Lola', '1993-06-10', 1, 'media/ES/jugadoras/lola.png', 173, 'right', 90000, 'https://www.soccerdonna.de/de/lola-gallardo/profil/spieler_3659.html', NULL, '2026-02-13 23:48:41'),
(47, 'Patricia', 'Larqué Juste', 'Patri Larqué', '1992-05-02', 1, 'media/ES/jugadoras/Patri Larqué.png', 165, 'right', 25000, 'https://www.soccerdonna.de/de/patricia-larque/profil/spieler_4591.html', NULL, '2026-02-13 23:48:41'),
(48, 'Ainhoa', 'Vicente Moraza', 'Moraza', '1995-08-20', 2, 'media/ES/jugadoras/moraza.png', 167, 'left', 175000, 'https://www.soccerdonna.de/de/ainhoa-moraza/profil/spieler_21853.html', '0000', '2026-02-13 23:48:42'),
(49, 'Carmen', 'Menayo Montero', 'Carmen Menayo', '1998-04-14', 3, 'media/ES/jugadoras/MENAYO.png', 170, 'left', 75000, 'https://www.soccerdonna.de/de/carmen-menayo/profil/spieler_22162.html', NULL, '2026-02-13 23:48:42'),
(50, 'Rosa María', 'Otermín Abella', 'Rosa Otermín', '2000-10-02', 4, 'media/ES/jugadoras/otermín.png', 167, 'left', 110000, 'https://www.soccerdonna.de/de/rosa-otermin/profil/spieler_35570.html', NULL, '2026-02-13 23:48:43'),
(51, 'Lauren Eduarda', 'Leal Costa', 'Lauren Leal', '2002-09-13', 3, 'media/BR/jugadoras/lauren.png', 178, 'right', 350000, 'https://www.soccerdonna.de/de/lauren-leal/profil/spieler_37897.html', NULL, '2026-02-13 23:48:43'),
(52, 'Silvia', 'Lloris Nicolás', 'Silvi', '2004-05-15', 3, 'media/ES/jugadoras/silvi.png', 168, 'right', 275000, 'https://www.soccerdonna.de/de/silvia-lloris/profil/spieler_40413.html', NULL, '2026-02-13 23:48:44'),
(53, 'Xènia', 'Pérez Almiñana', 'Xènia', '2001-10-28', 3, 'media/ES/jugadoras/Xènia.png', 171, 'right', 175000, 'https://www.soccerdonna.de/de/xnia-perez/profil/spieler_44494.html', NULL, '2026-02-13 23:48:45'),
(54, 'Andrea', 'Medina Martin', 'Andrea', '2004-05-11', 4, 'media/ES/jugadoras/medina.png', 162, 'left', 200000, 'https://www.soccerdonna.de/de/andrea-medina/profil/spieler_46959.html', NULL, '2026-02-13 23:48:45'),
(55, 'Tatiana Vanessa', 'Ferreira Pinto', 'Tati', '1994-03-28', 5, 'media/PT/jugadoras/tati.png', 173, 'right', 90000, 'https://www.soccerdonna.de/de/lola-gallardo/profil/spieler_3659.html', NULL, '2026-02-13 23:48:46'),
(56, 'Merle', 'Barth', 'Merle', '1994-04-21', 3, 'media/DE/jugadoras/merle.png', 167, 'right', 40000, 'https://www.soccerdonna.de/de/merle-barth/profil/spieler_6153.html', '0000', '2026-02-13 23:48:46'),
(57, 'Vilde', 'Bøe Risa', 'Vilde', '1995-07-13', 5, 'media/NO/jugadoras/boe risa.png', 166, 'right', 325000, 'https://www.soccerdonna.de/de/vilde-boe-risa/profil/spieler_15248.html', NULL, '2026-02-13 23:48:47'),
(58, 'Ana Vitória', 'Angélica Kliemaschewsk De Araújo', 'Ana Vitória', '2000-03-06', 7, 'media/BR/jugadoras/ana vitoria.png', 173, 'right', 70000, 'https://www.soccerdonna.de/en/ana-vitoria/profil/spieler_35800.html', NULL, '2026-02-13 23:48:48'),
(59, 'Gabriela Antonia', 'García Segura', 'Gaby García', '1997-04-02', 6, 'media/VE/jugadoras/gaby.png', 185, 'right', 450000, 'https://www.soccerdonna.de/en/gaby-garcia/profil/spieler_42254.html', NULL, '2026-02-13 23:48:49'),
(60, 'Fiamma', 'Benítez Iannuzzi', 'Fiamma', '2004-06-19', 7, 'media/ES/jugadoras/fiamma.png', 168, 'right', 500000, 'https://www.soccerdonna.de/de/fiamma-benitez/profil/spieler_48937.html', '0000', '2026-02-13 23:48:50'),
(61, 'Marta', 'Cardona De Miguel', 'Marta Cardona', '1995-05-26', 12, 'media/ES/jugadoras/cardona.png', 162, 'right', 50000, 'https://www.soccerdonna.de/en/marta-cardona/profil/spieler_20619.html', NULL, '2026-02-13 23:48:50'),
(62, 'Sheila', 'Guijarro Gómez', 'Shei', '1996-09-26', 10, 'media/ES/jugadoras/sheila.png', 169, 'right', 90000, 'https://www.soccerdonna.de/de/sheila-guijarro/profil/spieler_20395.html', NULL, '2026-02-13 23:48:51'),
(63, 'Synne', 'Jensen', 'Synne', '1996-02-15', 10, 'media/NO/jugadoras/jensen.png', 173, 'left', 90000, 'https://www.soccerdonna.de/de/synne-jensen/profil/spieler_16257.html', NULL, '2026-02-13 23:48:52'),
(64, 'Rasheedat', 'Ajibade', 'Ajibade', '1999-12-08', 11, 'media/NG/jugadoras/ajibade.png', 159, 'right', 425000, 'https://www.soccerdonna.de/en/rasheedat-ajibade/profil/spieler_23095.html', NULL, '2026-02-13 23:48:53'),
(65, 'Giovana', 'Queiroz Costa', 'Gio', '2003-06-21', 10, 'media/BR/jugadoras/gio.png', 167, 'right', 300000, 'https://www.soccerdonna.de/en/gio-garbelini/profil/spieler_42960.html', '0000', '2026-02-13 23:48:53'),
(66, 'Luany Vitória', 'Da Silva Rosa', 'Luany', '2003-02-03', 10, 'media/BR/jugadoras/luany.png', 164, 'both', 500000, 'https://www.soccerdonna.de/de/luany/profil/spieler_68248.html', NULL, '2026-02-13 23:48:54'),
(67, 'Mari Paz', 'Vilas Dono', 'Vilas', '1988-02-01', 10, 'media/ES/jugadoras/mapigol.png', 160, 'right', 25000, 'https://www.soccerdonna.de/en/mapi-vilas/profil/spieler_21640.html', '2023', '2026-02-13 23:48:55'),
(68, 'Enith', 'Salón Marcuello', 'Enith', '2001-09-24', 1, 'media/ES/jugadoras/enith.png', 167, 'right', NULL, 'https://www.soccerdonna.de/en/enith-salon/profil/spieler_41016.html', NULL, '2026-02-13 23:48:55'),
(69, 'Antonia Ignacia', 'Canales Pacheco', 'Canales', '2002-10-16', 1, 'media/CL/jugadoras/canales.png', 175, 'right', 60000, 'https://www.soccerdonna.de/de/antonia-canales/profil/spieler_47578.html', NULL, '2026-02-13 23:48:56'),
(70, 'Hanane', 'Ait El Haj', 'H. Ait El Haj', '1994-11-02', 2, 'media/MA/jugadoras/hanae.png', NULL, NULL, NULL, NULL, NULL, NULL),
(71, 'Emma', 'Tovar', 'E. Tovar', '2003-12-04', 4, 'media/US/jugadoras/tovar.png', NULL, NULL, NULL, NULL, NULL, NULL),
(72, 'Clara', 'Capdevila López', 'Clara', '2006-04-08', 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(73, 'Kerlly Lizeth', 'Real Carranza', 'Kerlly R.', '1998-11-07', 2, 'media/EC/jugadoras/kerlly.png', NULL, NULL, NULL, NULL, NULL, NULL),
(74, 'Claudia', 'Florentino Vivó', 'Florentino', '1998-03-10', 3, 'media/ES/jugadoras/florentino.png', 164, 'right', 50000, 'https://www.soccerdonna.de/de/claudia-florentino/profil/spieler_40287.html', NULL, '2026-02-13 23:48:57'),
(75, 'Yasmin Katie', 'Mrabet Slack', 'Yasmin', '1999-08-08', 5, 'media/ES/jugadoras/mrabet.png', NULL, NULL, NULL, NULL, NULL, NULL),
(76, 'Alice', 'Marques', 'Marques', '2005-05-04', 3, 'media/FR/jugadoras/alice.png', 170, 'right', 45000, 'https://www.soccerdonna.de/de/alice-marques/profil/spieler_64926.html', '0000', '2026-02-13 23:48:58'),
(77, 'Sara', 'Tamarit Verdeguer', 'Tamarit', '2005-11-11', 2, 'media/ES/jugadoras/tamarit.png', NULL, NULL, NULL, NULL, NULL, NULL),
(78, 'Marta', 'Carro Nolasco', 'M. Carro', '1991-01-06', 6, 'media/ES/jugadoras/carro.png', NULL, NULL, NULL, NULL, NULL, NULL),
(79, 'Alicja', 'Materek', 'Materek', '2001-11-07', 7, 'media/PL/jugadoras/alicja.png', NULL, NULL, NULL, NULL, NULL, NULL),
(80, 'Sofia Maria', 'Cerqueira Goncalves Silva', 'Sofia S.', '2002-08-07', 13, 'media/PT/jugadoras/gonzalves.png', NULL, NULL, NULL, NULL, NULL, NULL),
(81, 'Aida', 'Esteve Quintero', 'Aida', '2001-03-12', 5, 'media/ES/jugadoras/esteve.png', NULL, NULL, NULL, NULL, NULL, NULL),
(82, 'Malena', 'Ortiz Cruz', 'M. Ortiz', '1997-07-16', 5, 'media/ES/jugadoras/malena.png', NULL, NULL, NULL, NULL, NULL, NULL),
(83, 'Ainhoa', 'Alguacil Amores', 'Ainhoa', '2006-01-08', 5, 'media/ES/jugadoras/alguacil.png', NULL, NULL, NULL, NULL, NULL, NULL),
(84, 'Olga', 'San Nicolás Rolando', 'San Nicolás', '2003-11-11', 5, 'media/ES/jugadoras/san nicolas.png', NULL, NULL, NULL, NULL, NULL, NULL),
(85, 'Marina', 'Martí Serna', 'M. Martí', '1996-08-24', 5, 'media/ES/jugadoras/marina marti.png', NULL, NULL, NULL, NULL, NULL, NULL),
(86, 'Paula', 'Sancho González', 'Pauleta', '1998-06-12', 5, 'media/ES/jugadoras/pauleta sancho.png', NULL, NULL, NULL, NULL, NULL, NULL),
(87, 'Ana', 'Marcos Moral', 'Anita', '2000-07-09', 10, 'media/ES/jugadoras/anita.png', NULL, NULL, NULL, NULL, NULL, NULL),
(88, 'Asun', 'Martínez Salinas', 'Asun', '2002-02-20', 12, 'media/ES/jugadoras/asun.png', 158, 'left', 50000, 'https://www.soccerdonna.de/en/asun-martinez/profil/spieler_40414.html', '0000', '2026-02-25 11:12:59'),
(89, 'Phoenetia Maiya Lureen', 'Browne', 'Browne', '1994-04-22', 10, 'media/KN/jugadoras/browne.png', 173, 'left', 25000, 'https://www.soccerdonna.de/de/phoenetia-browne/profil/spieler_36005.html', '0000', '2026-02-13 23:48:58'),
(90, 'Vitoria', 'Silva De Almeida', 'V. Almeida', '1999-08-26', 10, 'media/BR/jugadoras/almeida.png', NULL, NULL, NULL, NULL, NULL, NULL),
(91, 'María Asunción', 'Quiñones Goikoetxea', 'Quiñones', '1996-10-29', 1, 'media/ES/jugadoras/quiñones.png', NULL, NULL, NULL, NULL, NULL, NULL),
(92, 'Adriana', 'Nanclares Romero', 'A. Nanclares', '2002-05-09', 1, 'media/ES/jugadoras/nanclares.png', 170, 'right', 125000, 'https://www.soccerdonna.de/de/adriana-nanclares/profil/spieler_42896.html', NULL, '2026-02-13 23:48:59'),
(93, 'Maddi', 'Torre Larrañaga', 'Maddi', '1996-03-30', 3, 'media/ES/jugadoras/maddi.png', 172, 'right', 75000, 'https://www.soccerdonna.de/de/maddi-torre/profil/spieler_40241.html', NULL, '2026-02-13 23:49:00'),
(94, 'Bibiane', 'Schulze-Solano', 'Bibi', '1998-11-12', 3, 'media/ES/jugadoras/bibi.png', 174, 'left', 270000, 'https://www.soccerdonna.de/de/bibiane-schulze-solano/profil/spieler_21194.html', '0000', '2026-02-13 23:49:00'),
(95, 'Nerea', 'Nevado Gómez', 'Nerea Nevado', '2001-04-27', 4, 'media/ES/jugadoras/nevado.png', 160, 'left', 175000, 'https://www.soccerdonna.de/de/nerea-nevado/profil/spieler_37848.html', NULL, '2026-02-13 23:49:01'),
(96, 'Ane', 'Elexpuru Añorga', 'Elexpuru', '2003-05-02', 2, 'media/ES/jugadoras/elexpuru.png', 160, 'right', 175000, 'https://www.soccerdonna.de/de/ane-elexpuru/profil/spieler_47644.html', NULL, '2026-02-13 23:49:01'),
(97, 'Naia', 'Landaluze Marquínez', 'Landaluze', '2000-09-25', 3, 'media/ES/jugadoras/landaluze.png', 170, 'right', 80000, 'https://www.soccerdonna.de/de/naia-landaluze/profil/spieler_51803.html', NULL, '2026-02-13 23:49:02'),
(98, 'Garazi', 'Facila Giralte', 'Gara', '1999-10-25', 3, 'media/ES/jugadoras/gara.png', 163, 'left', 30000, 'https://www.soccerdonna.de/de/garazi-facila/profil/spieler_49210.html', NULL, '2026-02-13 23:49:03'),
(99, 'Itsaso', 'Miranda Aldasoro', 'Miranda', '2000-05-13', 9, 'media/ES/jugadoras/mirandda.png', NULL, NULL, NULL, NULL, NULL, NULL),
(100, 'Marta', 'Unzué Urdaniz', 'M. Unzué', '1988-07-04', 6, 'media/ES/jugadoras/unzue.png', NULL, NULL, NULL, NULL, '2025', NULL),
(101, 'Itxaso', 'Uriarte Santamaría', 'Itxaso', '1991-09-01', 5, 'media/ES/jugadoras/itxaso.png', 168, 'right', 25000, 'https://www.soccerdonna.de/de/itxaso-uriarte/profil/spieler_21852.html', NULL, '2026-02-13 23:49:03'),
(102, 'Leire', 'Baños Indakoetxea', 'L. Baños', '1996-11-29', 6, 'media/ES/jugadoras/leire.png', 166, 'right', 100000, 'https://www.soccerdonna.de/de/leire-baos/profil/spieler_21843.html', NULL, '2026-02-13 23:49:04'),
(103, 'Mariana', 'Cerro Galán', 'Mariana', '2000-05-22', 6, 'media/ES/jugadoras/mariana.png', NULL, NULL, NULL, NULL, NULL, NULL),
(104, 'Maite', 'Zubieta Arambarri', 'M. Zubieta', '2004-05-28', 6, 'media/ES/jugadoras/zubieta.png', 173, 'right', 265000, 'https://www.soccerdonna.de/de/maite-zubieta/profil/spieler_47647.html', NULL, '2026-02-13 23:49:04'),
(105, 'Irene', 'Oguiza Martínez', 'Oguiza', '2000-01-05', 5, 'media/ES/jugadoras/oguiza.png', 179, 'right', 75000, 'https://www.soccerdonna.de/de/irene-oguiza/profil/spieler_44277.html', NULL, '2026-02-13 23:49:05'),
(106, 'Clara', 'Pinedo Castresana', 'Pinedo', '2003-09-09', 7, 'media/ES/jugadoras/pinedo.png', 165, 'right', 80000, 'https://www.soccerdonna.de/de/clara-pinedo/profil/spieler_47661.html', NULL, '2026-02-13 23:49:05'),
(107, 'Maite', 'Valero Elia', 'Valero', '2003-10-05', 5, 'media/ES/jugadoras/valero.png', 170, 'right', 90000, 'https://www.soccerdonna.de/de/maite-valero/profil/spieler_78000.html', NULL, '2026-02-13 23:49:06'),
(108, 'Nahikari', 'García Pérez', 'Nahikari', '1997-03-10', 10, 'media/ES/jugadoras/nahikari.png', NULL, NULL, NULL, NULL, NULL, NULL),
(109, 'Ainize', 'Barea Núñez', 'Peke', '1992-01-25', 10, 'media/ES/jugadoras/peke.png', NULL, NULL, NULL, NULL, '2025', NULL),
(110, 'Patricia', 'Zugasti Oses', 'P. Zugasti', '2000-08-07', 10, 'media/ES/jugadoras/zugasti.png', 164, 'right', 40000, 'https://www.soccerdonna.de/de/patri-zugasti/profil/spieler_49225.html', NULL, '2026-02-13 23:49:06'),
(111, 'Ane', 'Azkona Fuente', 'Azkona', '1998-07-15', 9, 'media/ES/jugadoras/azkona.png', 164, 'right', 80000, 'https://www.soccerdonna.de/de/ane-azkona/profil/spieler_38457.html', NULL, '2026-02-13 23:49:07'),
(112, 'Jone', 'Amezaga Martínez', 'J. Amezaga', '2005-01-02', 8, 'media/ES/jugadoras/amezaga.png', 165, 'right', 110000, 'https://www.soccerdonna.de/de/jone-amezaga/profil/spieler_51800.html', NULL, '2026-02-13 23:49:07'),
(113, 'Marta', 'San Adrián Rocandio', 'Sanadri', '2000-02-22', 10, 'media/ES/jugadoras/sanadri.png', NULL, NULL, NULL, NULL, NULL, NULL),
(114, 'Sara', 'Ortega Ruiz', 'S. Ortega', '2005-02-20', 9, 'media/ES/jugadoras/ortega.png', 154, 'right', 250000, 'https://www.soccerdonna.de/de/sara-ortega/profil/spieler_51806.html', NULL, '2026-02-13 23:49:08'),
(115, 'Romane', 'Salvador', 'Romane Salvador', '1998-05-09', 1, 'media/FR/jugadoras/romane salvador.png', 170, 'right', 50000, 'https://www.soccerdonna.de/de/romane-salvador/profil/spieler_29194.html', NULL, '2026-02-13 23:49:09'),
(116, 'Mar', 'Segarra Casanova', 'Mar Segarra Casanova', '2001-07-05', 1, 'media/ES/jugadoras/mar segarra.png', NULL, NULL, NULL, NULL, NULL, NULL),
(117, 'Paula', 'Perea Ramírez', 'Perea', '1996-06-19', 4, 'media/ES/jugadoras/paula perea.png', 157, 'left', 40000, 'https://www.soccerdonna.de/de/paula-perea/profil/spieler_20636.html', NULL, '2026-02-13 23:49:10'),
(118, 'Daniela', 'Caracas González', 'Daniela Caracas González', '1997-04-25', 2, 'media/CO/jugadoras/caracas.png', 166, 'right', 60000, 'https://www.soccerdonna.de/de/daniela-caracas/profil/spieler_38155.html', NULL, '2026-02-13 23:49:10'),
(119, 'Laia', 'Balleste Sciora', 'Laia Balleste Sciora', '1999-02-22', 3, 'media/SUI/jugadoras/laia balleste.png', 172, 'right', 40000, 'https://www.soccerdonna.de/de/laia-balleste/profil/spieler_51378.html', NULL, '2026-02-13 23:49:11'),
(120, 'Arola A.', 'Arola Aparicio Gili', 'Arola Aparicio Gili', '1997-09-24', 9, 'media/ES/jugadoras/arola aparicio.png', 170, 'right', 40000, 'https://www.soccerdonna.de/de/arola-aparicio/profil/spieler_44513.html', NULL, '2026-02-13 23:49:12'),
(121, 'Júlia', 'Guerra Peiró', 'Júlia Guerra Peiró', '2002-01-23', 3, 'media/ES/jugadoras/guerra.png', 165, 'left', 50000, 'https://www.soccerdonna.de/de/julia-guerra/profil/spieler_52005.html', NULL, '2026-02-13 23:49:13'),
(122, 'Lucía', 'Vallejo Blázquez', 'Lucía Vallejo Blázquez', '2003-07-10', 4, 'media/ES/jugadoras/vallejo.png', 165, 'left', 50000, 'https://www.soccerdonna.de/de/lucia-vallejo/profil/spieler_49282.html', NULL, '2026-02-13 23:49:13'),
(123, 'Amaia', 'Martínez De La Peña', 'Amaia Martínez De La Peña', '2004-06-29', 2, 'media/ES/jugadoras/amaia_martinez.png', 167, 'right', 50000, 'https://www.soccerdonna.de/de/amaia-martinez/profil/spieler_47657.html', NULL, '2026-02-13 23:49:14'),
(124, 'Estefanía', 'Botero Granda', 'Estefanía Botero Granda', '2000-11-11', 3, 'media/CO/jugadoras/simona.png', NULL, NULL, NULL, NULL, NULL, NULL),
(125, 'Ylenia', 'Estrella Gil', 'Ylenia Estrella Gil', '2004-11-11', 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(126, 'Ana Belén', 'Hernández Rodríguez', 'Ana Belén Hernández Rodríguez', '1990-09-23', 5, 'media/ES/jugadoras/ana hdez.png', NULL, NULL, NULL, NULL, NULL, NULL),
(127, 'Ainoa', 'Campo Franco', 'Ainoa Campo Franco', '1996-06-17', 5, 'media/ES/jugadoras/ainoa.png', 162, 'right', 65000, 'https://www.soccerdonna.de/de/ainoa-campo/profil/spieler_40288.html', NULL, '2026-02-13 23:49:15'),
(128, 'Carolina', 'Marín De La Fuente', 'Marín', '1996-11-27', 5, 'media/ES/jugadoras/carol.png', 156, 'right', 40000, 'https://www.soccerdonna.de/en/carol-marin/profil/spieler_38466.html', NULL, '2026-02-13 23:49:15'),
(129, 'Judit', 'Pablos Garrido', 'Judit Pablos Garrido', '1997-12-07', 12, 'media/ES/jugadoras/pablos.png', 170, 'right', 30000, 'https://www.soccerdonna.de/de/judit-pablos/profil/spieler_49324.html', NULL, '2026-02-13 23:49:16'),
(130, 'Mar', 'Torrás De Fortuny', 'Mar Torrás De Fortuny', '1996-04-06', 5, 'media/ES/jugadoras/mar t.png', 170, 'right', 35000, 'https://www.soccerdonna.de/de/mar-torras/profil/spieler_48045.html', NULL, '2026-02-13 23:49:17'),
(131, 'Amanda', 'Mbadi', 'Amanda Mbadi', '1999-01-04', 6, 'media/NG/jugadoras/mbadi.png', NULL, NULL, NULL, NULL, NULL, NULL),
(132, 'Ángeles', 'Del Álamo Sánchez', 'Álamo', '1998-06-23', 10, 'media/ES/jugadoras/del alamo.png', 170, 'right', 30000, 'https://www.soccerdonna.de/de/ngeles-del-lamo/profil/spieler_38480.html', NULL, '2026-02-13 23:49:17'),
(133, 'Lice Fabiana', 'Chamorro Gómez', 'Lice Fabiana Chamorro Gómez', '1998-12-22', 10, 'media/PY/jugadoras/chamorro.png', 172, 'right', 60000, 'https://www.soccerdonna.de/de/lice-chamorro/profil/spieler_35850.html', NULL, '2026-02-13 23:49:18'),
(134, 'Trudi Sudan', 'Carter', 'Trudi Sudan Carter', '1994-11-18', 12, 'media/JM/jugadoras/carter.png', NULL, NULL, NULL, NULL, NULL, NULL),
(135, 'Natalia', 'Montilla Martínez', 'Natalia Montilla Martínez', '1998-10-18', 9, 'media/ES/jugadoras/montilla.png', NULL, NULL, NULL, NULL, NULL, NULL),
(136, 'Iara', 'Lacosta Sanchez', 'Iara Lacosta Sanchez', '2001-11-08', 11, 'media/ES/jugadoras/iara.png', 168, 'left', 30000, 'https://www.soccerdonna.de/de/iara-lacosta/profil/spieler_49220.html', NULL, '2026-02-13 23:49:19'),
(137, 'Mylene', 'Chavas', 'Chavas', '1998-01-07', 1, 'media/FR/jugadoras/chavas.png', NULL, NULL, NULL, NULL, NULL, NULL),
(138, 'María Isabel', 'Rodríguez Rivero', 'Misa', '1999-07-22', 1, 'media/ES/jugadoras/misa.png', NULL, NULL, NULL, NULL, NULL, NULL),
(139, 'Rocío', 'Gálvez Luna', 'Rocío', '1997-04-15', 3, 'media/ES/jugadoras/rocio.png', 174, 'right', 175000, 'https://www.soccerdonna.de/de/rocio-galvez/profil/spieler_22152.html', NULL, '2026-02-13 23:49:20'),
(140, 'Oihane', 'Hernández Zurbano', 'Oihane', '2000-05-04', 2, 'media/ES/jugadoras/oihane.png', NULL, NULL, NULL, NULL, NULL, NULL),
(141, 'Maëlle Ourida Louisette', 'Lakrar', 'Lakrar', '2000-05-27', 3, 'media/FR/jugadoras/lakrar.png', 172, 'right', 380000, 'https://www.soccerdonna.de/de/malle-lakrar/profil/spieler_31733.html', NULL, '2026-02-13 23:49:20'),
(142, 'Sheila', 'García Gómez', 'Shei', '1997-03-15', 2, 'media/ES/jugadoras/shei.png', 164, 'left', 280000, 'https://www.soccerdonna.de/de/shei-garcia/profil/spieler_38482.html', NULL, '2026-02-13 23:49:21'),
(143, 'Olga', 'Carmona García', 'Olga', '2000-06-12', 4, 'media/ES/jugadoras/olga.png', NULL, NULL, NULL, NULL, NULL, NULL),
(144, 'Antônia Ronnycleide', 'Da Costa Silva', 'Antônia S.', '1994-04-26', 2, 'media/BR/jugadoras/antonia.png', 168, 'right', 190000, 'https://www.soccerdonna.de/de/antonia-silva/profil/spieler_44039.html', NULL, '2026-02-13 23:49:22'),
(145, 'María', 'Méndez Fernández', 'Mery', '2001-04-10', 3, 'media/ES/jugadoras/mery.png', 173, 'right', 450000, 'https://www.soccerdonna.de/de/maria-mendez/profil/spieler_35184.html', NULL, '2026-02-13 23:49:22'),
(146, 'Melanie', 'Leupolz', 'Leupolz', '1994-04-14', 6, 'media/DE/jugadoras/leupolz.png', NULL, NULL, NULL, NULL, NULL, NULL),
(147, 'Caroline Elspeth Lillias', 'Weir', 'Weir', '1995-06-20', 7, 'media/SS/jugadoras/weir.png', 173, 'left', 800000, 'https://www.soccerdonna.de/de/caroline-weir/profil/spieler_10461.html', NULL, '2026-02-13 23:49:23'),
(148, 'Maite', 'Oroz Areta', 'M. Oroz', '1998-03-25', 5, 'media/ES/jugadoras/oroz.png', NULL, NULL, NULL, NULL, NULL, NULL),
(149, 'Sandie Rose', 'Toletti', 'Toletti', '1995-07-13', 5, 'media/FR/jugadoras/toletti.png', 169, 'right', 365000, 'https://www.soccerdonna.de/de/sandie-toletti/profil/spieler_6476.html', NULL, '2026-02-13 23:49:23'),
(150, 'Ingrid Filippa', 'Angeldahl', 'Angeldal', '1997-07-14', 5, 'media/SE/jugadoras/angeldal.png', 170, 'right', 575000, 'https://www.soccerdonna.de/de/filippa-angeldahl/profil/spieler_22436.html', NULL, '2026-02-13 23:49:24'),
(151, 'Teresa', 'Abelleira Dueñas', 'Teresa', '2000-01-09', 6, 'media/ES/jugadoras/tere.png', 160, 'right', 390000, 'https://www.soccerdonna.de/de/teresa-abelleira/profil/spieler_35562.html', NULL, '2026-02-13 23:49:24'),
(152, 'Alba María', 'Redondo Ferrer', 'Redondo', '1996-08-27', 10, 'media/ES/jugadoras/albi.png', 169, 'both', 480000, 'https://www.soccerdonna.de/de/alba-redondo/profil/spieler_23155.html', NULL, '2026-02-13 23:49:25'),
(153, 'Caroline-Sophie', 'Moller Hansen', 'Møller', '1998-12-19', 10, 'media/DK/jugadoras/moller.png', NULL, NULL, NULL, NULL, NULL, NULL),
(154, 'Eva María', 'Navarro García', 'Eva Navarro', '2001-01-27', 12, 'media/ES/jugadoras/eva navarro.png', 160, 'both', 200000, 'https://www.soccerdonna.de/de/eva-navarro/profil/spieler_30432.html', NULL, '2026-02-13 23:49:25'),
(155, 'Signe Kallesøe', 'Bruun', 'Bruun', '1998-04-06', 10, 'media/DK/jugadoras/bruun.png', 178, 'right', 325000, 'https://www.soccerdonna.de/de/signe-bruun/profil/spieler_27075.html', NULL, '2026-02-13 23:49:26'),
(156, 'Naomie Noëlle', 'Feller', 'Feller', '2001-11-06', 10, 'media/FR/jugadoras/feller.png', 170, 'right', 275000, 'https://www.soccerdonna.de/de/naomie-feller/profil/spieler_40797.html', NULL, '2026-02-13 23:49:26'),
(157, 'Athenea', 'Del Castillo Beivide', 'Athenea', '2000-10-24', 12, 'media/ES/jugadoras/athenea.png', 160, 'right', 650000, 'https://www.soccerdonna.de/de/athenea-del-castillo/profil/spieler_35564.html', NULL, '2026-02-13 23:49:27'),
(158, 'Linda Lizeth', 'Caicedo Alegria', 'Linda C.', '2005-02-22', 11, 'media/CO/jugadoras/linda.png', 162, 'right', 1000000, 'https://www.soccerdonna.de/de/linda-caicedo/profil/spieler_53792.html', NULL, '2026-02-13 23:49:27'),
(159, 'Carla', 'Camacho Carrillo', 'C. Camacho', '2005-05-02', 10, 'media/ES/jugadoras/camacho.png', NULL, NULL, NULL, NULL, NULL, NULL),
(160, 'Amor', 'Leigh Martín Esteban', 'Amor Leigh', '2007-12-16', 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(161, 'Esther', 'Sullastres Ayuso', 'Sullastres', '1993-03-20', 1, 'media/ES/jugadoras/sullastres.png', 175, 'right', 65000, 'https://www.soccerdonna.de/de/esther-sullastres/profil/spieler_5052.html', NULL, '2026-02-13 23:49:28'),
(162, 'Yolanda', 'Aguirre Gutiérrez', 'Y. Aguirre', '1998-10-23', 1, 'media/ES/jugadoras/yolanda a.png', NULL, NULL, NULL, NULL, NULL, NULL),
(163, 'Alba', 'López Pérez', 'Alba López', '2005-03-08', 2, 'media/ES/jugadoras/alba lopez.png', 169, 'right', 45000, 'https://www.soccerdonna.de/de/alba-perez/profil/spieler_49266.html', NULL, '2026-02-13 23:49:29'),
(164, 'Andrea', 'Gálvez', 'A. Gálvez', '2008-09-02', 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(165, 'Débora', 'García Mateo', 'Débora G.', '1989-10-17', 2, 'media/ES/jugadoras/debora.png', 168, 'right', 25000, 'https://www.soccerdonna.de/de/debora-garcia/profil/spieler_5013.html', NULL, '2026-02-13 23:49:29'),
(166, 'Eva', 'Llamas Hernández', 'Eva Llamas', '1992-05-29', 3, 'media/ES/jugadoras/eva llamas.png', 170, 'right', 40000, 'https://www.soccerdonna.de/de/eva-llamas/profil/spieler_4798.html', NULL, '2026-02-13 23:49:30'),
(167, 'Diana Catarina Ribeiro', 'Gomes', 'Diana G.', '1998-07-26', 3, 'media/PT/jugadoras/diana gomes.png', NULL, NULL, NULL, NULL, NULL, NULL),
(168, 'Raquel', 'Morcillo Aparicio', 'Raquel', '1999-04-08', 4, 'media/ES/jugadoras/raquel morcillo.png', 167, 'left', 60000, 'https://www.soccerdonna.de/de/raquel-morcillo/profil/spieler_49265.html', NULL, '2026-02-13 23:49:30'),
(169, 'Nazareth', 'Martín Vázquez', 'Nazareth', '2004-02-26', 3, 'media/ES/jugadoras/nazareth.png', NULL, NULL, NULL, NULL, NULL, NULL),
(170, 'Julia', 'Torres', 'J. Torres', '2009-01-15', 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(171, 'Gemma', 'Gili Giner', 'Gemma', '1994-05-21', 5, 'media/ES/jugadoras/gemma gili.png', 167, 'left', 60000, 'https://www.soccerdonna.de/de/gemma-gili/profil/spieler_4789.html', NULL, '2026-02-13 23:49:31'),
(172, 'Iris', 'Arnaiz Gil', 'I. Arnaiz', '1994-05-18', 6, 'media/ES/jugadoras/iris arnaiz.png', 168, 'right', 45000, 'https://www.soccerdonna.de/de/iris-arnaiz/profil/spieler_21834.html', NULL, '2026-02-13 23:49:31'),
(173, 'Cinthia Pamela', 'González Medina', 'P. González', '1995-09-28', 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(174, 'Alicia', 'Redondo González', 'Alicia', '2001-11-02', 6, 'media/ES/jugadoras/alicia.png', 167, 'both', 60000, 'https://www.soccerdonna.de/de/alicia-redondo/profil/spieler_40281.html', NULL, '2026-02-13 23:49:32'),
(175, 'Millaray Scarleth', 'Cortés Espinoza', 'Cortés', '2004-06-30', 7, NULL, 159, 'right', 45000, 'https://www.soccerdonna.de/de/millaray-cortes/profil/spieler_72182.html', NULL, '2026-02-13 23:49:32'),
(176, 'Fatoumata', 'Kanteh Cham', 'Kanteh', '1997-07-02', 10, 'media/ES/jugadoras/kanteh.png', 168, 'right', 60000, 'https://www.soccerdonna.de/de/fatou-kanteh/profil/spieler_40238.html', '0000', '2026-02-13 23:49:33'),
(177, 'Natalia Alessandra', 'Padilla Bidas', 'Padilla Bidas', '2002-11-06', 12, 'media/PL/jugadoras/padilla.png', NULL, NULL, NULL, NULL, NULL, NULL),
(178, 'Fatima Zahra', 'Tagnaout', 'Tagnaout', '1999-01-20', 11, 'media/MA/jugadoras/tagnaout.png', NULL, NULL, NULL, NULL, NULL, NULL),
(179, 'Paula', 'Partido Durán', 'P. Partido', '2005-03-02', 10, 'media/ES/jugadoras/partido.png', NULL, NULL, NULL, NULL, NULL, NULL),
(180, 'Lucia', 'Corrales Álvarez', 'L. Corrales', '2005-11-24', 11, 'media/ES/jugadoras/corrales.png', NULL, NULL, NULL, NULL, NULL, NULL),
(181, 'Lucía', 'Moral Ruiz', 'Wifi', '2004-02-11', 10, 'media/ES/jugadoras/wifi.png', 171, 'right', 40000, 'https://www.soccerdonna.de/de/lucia-moral/profil/spieler_52918.html', NULL, '2026-02-13 23:49:34'),
(182, 'Inês', 'Teixeira Pereira', 'Inês Pereira', '1999-05-26', 1, 'media/PT/jugadoras/ines pereira.png', 168, 'left', 100000, 'https://www.soccerdonna.de/de/ins-pereira/profil/spieler_32446.html', NULL, '2026-02-13 23:49:34'),
(183, 'Yohana', 'Gómez Camino', 'Yohana', '1994-01-20', 1, 'media/ES/jugadoras/yohana.png', 168, 'right', 25000, 'https://www.soccerdonna.de/de/yohana-gomez/profil/spieler_40952.html', NULL, '2026-02-13 23:49:35'),
(184, 'Francisca Alejandra', 'Lara Lara', 'F. Lara', '1990-07-29', 4, 'media/CL/jugadoras/lara.png', NULL, NULL, NULL, NULL, NULL, NULL),
(185, 'Raquel', 'García Yagüe', 'Raquel G.', '1997-04-22', 3, 'media/ES/jugadoras/raquel.png', 168, 'right', 45000, 'https://www.soccerdonna.de/de/raquel-garcia/profil/spieler_40213.html', NULL, '2026-02-13 23:49:36'),
(186, 'Cristina', 'Martínez Gutiérrez', 'Cris M.', '1993-06-26', 2, 'media/ES/jugadoras/cris m.png', 160, 'right', 30000, 'https://www.soccerdonna.de/de/cris-martinez/profil/spieler_42253.html', NULL, '2026-02-13 23:49:36'),
(187, 'Samara', 'Ortiz Cruz', 'S. Ortiz', '1997-07-16', 4, 'media/ES/jugadoras/Samara.png', 159, 'right', 35000, 'https://www.soccerdonna.de/de/samara-ortiz/profil/spieler_41599.html', NULL, '2026-02-13 23:49:37'),
(188, 'Vera', 'Martínez Viota', 'Vera', '1999-09-13', 3, 'media/ES/jugadoras/vera.png', 170, 'left', 40000, 'https://www.soccerdonna.de/de/vera-martinez/profil/spieler_49237.html', NULL, '2026-02-13 23:49:38'),
(189, 'Marina', 'Artero Moreno', 'M. Artero', '2005-10-14', 3, 'media/ES/jugadoras/artero.png', 186, 'right', 35000, 'https://www.soccerdonna.de/de/marina-artero/profil/spieler_53902.html', NULL, '2026-02-13 23:49:39'),
(190, 'Lucía', 'Martínez González', 'Lucía', '2001-11-27', 6, 'media/ES/jugadoras/lucia.png', 170, 'right', 40000, 'https://www.soccerdonna.de/de/lucia-martinez/profil/spieler_51896.html', NULL, '2026-02-13 23:49:39'),
(191, 'Bárbara', 'Latorre Viñals', 'Bárbara', '1993-03-14', 11, 'media/ES/jugadoras/barbi.png', 164, 'right', 35000, 'https://www.soccerdonna.de/de/barbara-latorre/profil/spieler_21913.html', NULL, '2026-02-13 23:49:40'),
(192, 'Patrícia', 'Hmírová', 'Hmírová', '1993-11-30', 12, 'media/SK/jugadoras/hmirová.png', NULL, NULL, NULL, NULL, NULL, NULL),
(193, 'Paula', 'Gutiérrez Caballero', 'Paula G.', '2001-03-02', 5, 'media/ES/jugadoras/paula g.png', 170, 'right', 40000, 'https://www.soccerdonna.de/de/paula-gutierrez/profil/spieler_38464.html', NULL, '2026-02-13 23:49:41'),
(194, 'Carlota', 'Sánchez Sánchez', 'Carlota', '2002-01-21', 5, 'media/ES/jugadoras/carlota.png', 167, 'right', 25000, 'https://www.soccerdonna.de/de/carlota-sanchez/profil/spieler_40416.html', NULL, '2026-02-13 23:49:41'),
(195, 'Henar', 'Muiña Asla', 'Henar', '1999-10-20', 5, 'media/ES/jugadoras/henar.png', 167, 'right', 35000, 'https://www.soccerdonna.de/de/henar-muia/profil/spieler_50708.html', NULL, '2026-02-13 23:49:42'),
(196, 'Eva', 'Dios Nieto', 'Eva Dios', '2002-03-04', 5, 'media/ES/jugadoras/eva dios.png', 165, 'right', 30000, 'https://www.soccerdonna.de/de/eva-dios/profil/spieler_52038.html', NULL, '2026-02-13 23:49:42'),
(197, 'Olaya', 'Enrique Rodríguez', 'Olaya', '2005-05-10', 7, 'media/ES/jugadoras/olaya.png', 166, 'right', 50000, 'https://www.soccerdonna.de/de/olaya-rodriguez/profil/spieler_51995.html', NULL, '2026-02-13 23:49:43'),
(198, 'Oriana Yoselyn', 'Altuve Mancilla', 'Altuve', '1992-10-03', 10, 'media/VE/jugadoras/altuve.png', NULL, NULL, NULL, NULL, NULL, NULL),
(199, 'Ainhoa', 'Marín Martín', 'Ainhoa M.', '2001-03-21', 12, 'media/ES/jugadoras/ainhoa.png', 165, 'right', 60000, 'https://www.soccerdonna.de/de/ainhoa-marin/profil/spieler_23152.html', NULL, '2026-02-13 23:49:43'),
(200, 'Ana Lucía', 'De Teresa Romero', 'ADT', '2001-11-05', 10, 'media/ES/jugadoras/adt.png', NULL, NULL, NULL, NULL, NULL, NULL),
(201, 'Millene', 'Cabral Vieira', 'Millene', '1997-11-29', 10, 'media/BR/jugadoras/millene.png', 164, 'right', 50000, 'https://www.soccerdonna.de/de/millene-cabral/profil/spieler_43120.html', NULL, '2026-02-13 23:49:44'),
(202, 'Noelia', 'Gil Pérez', 'Noelia Gil', '1994-05-23', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(203, 'Paula', 'Vizoso Prieto', 'P. Vizoso', '2000-02-17', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(204, 'Nuria', 'Ligero Fernández', 'Nana', '1991-09-04', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(205, 'Erika', 'Santoro', 'Santoro', '1999-09-03', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(206, 'Dorine Nina', 'Chuigoue', 'Dorine', '1988-11-28', 3, 'media/CM/jugadoras/dorine.png', NULL, NULL, NULL, NULL, NULL, NULL),
(207, 'María', 'Jiménez Gutiérrez', 'M. Jiménez', '2000-09-17', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(208, 'Esther', 'Martín-Pozuelo Aranda', 'Esther', '1998-10-08', 4, NULL, 164, 'left', 35000, 'https://www.soccerdonna.de/de/esther-martin-pozuelo/profil/spieler_41596.html', NULL, '2026-02-13 23:49:44'),
(209, 'Blanca', 'Muñoz García', 'Blanca Muñoz', '1999-11-11', 2, NULL, 165, 'right', 30000, 'https://www.soccerdonna.de/de/blanca-muoz/profil/spieler_54879.html', NULL, '2026-02-13 23:49:45'),
(210, 'Carla', 'Santaliestra Alonso', 'Carla Santaliestra', '2003-08-12', 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(211, 'Marina', 'Sánchez Romero', 'Marina Sánchez', '2000-11-11', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(212, 'Alba', 'Rodao Alonso', 'A. Rodao', '2006-01-28', 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(213, 'Rhiannon Beth', 'Roberts', 'Roberts', '1990-08-30', 3, 'media/WAL/jugadoras/roberts.png', NULL, NULL, NULL, NULL, NULL, NULL),
(214, 'Estela', 'Fernández Pablos', 'Estela', '1991-05-09', 5, 'media/ES/jugadoras/estella.png', NULL, NULL, NULL, NULL, NULL, NULL),
(215, 'Naima', 'García Aguilar', 'Naima', '1998-06-24', 12, NULL, 160, 'left', 30000, 'https://www.soccerdonna.de/de/naima-garcia/profil/spieler_38481.html', NULL, '2026-02-13 23:49:45'),
(216, 'Rosa', 'Márquez Baena', 'Rosa M.', '2000-12-22', 5, NULL, 158, 'right', 75000, 'https://www.soccerdonna.de/de/rosa-marquez/profil/spieler_35568.html', NULL, '2026-02-13 23:49:46'),
(217, 'María', 'Ruiz Gámez', 'María Ruiz', '2001-01-11', 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(218, 'Gema', 'Soliveres Cholbi', 'Gema', '2000-11-03', 5, 'media/ES/jugadoras/soliveres.png', 170, 'right', 30000, 'https://www.soccerdonna.de/en/gema-soliveres/profil/spieler_49244.html', '0000', '2026-02-13 23:49:47'),
(219, 'Carla', 'Armengol Joaniquet', 'Carla', '1998-04-02', 11, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(220, 'Carolina', 'Férez Méndez', 'Carol', '1991-06-26', 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(221, 'Tiffany Devonna', 'Cameron', 'T. Cameron', '1991-10-16', 10, 'media/JM/jugadoras/cameron.png', NULL, NULL, NULL, NULL, NULL, NULL),
(222, 'Júlia', 'Aguado Fernández', 'Júlia', '2000-05-02', 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(223, 'Carmen', 'Álvarez Sánchez', 'Carmen Á.', '2003-02-24', 10, NULL, 177, 'right', 30000, 'https://www.soccerdonna.de/de/carmen-lvarez/profil/spieler_49270.html', NULL, '2026-02-13 23:49:47'),
(224, 'Yasmine', 'Zouhir', 'Zouhir', '2005-07-16', 10, 'media/FR/jugadoras/zouhir.png', NULL, NULL, NULL, NULL, NULL, NULL),
(225, 'Elene', 'Lete Para', 'Elene', '2002-05-07', 1, 'media/ES/jugadoras/elene lete.png', NULL, NULL, NULL, NULL, NULL, NULL),
(226, 'Olatz', 'Santana Amado', 'Olatz', '1997-05-08', 1, 'media/ES/jugadoras/olatz.png', 171, 'right', 25000, 'https://www.soccerdonna.de/de/olatz-santana/profil/spieler_58197.html', NULL, '2026-02-13 23:49:48'),
(227, 'Lucía María', 'Rodríguez Herrero', 'Lucia', '1999-05-24', 4, 'media/ES/jugadoras/lucia_perez.png', 164, 'right', 80000, 'https://www.soccerdonna.de/de/lucia-rodriguez/profil/spieler_30438.html', NULL, '2026-02-13 23:49:49'),
(228, 'Ane', 'Etxezarreta Aierbe', 'Etxezarreta ', '1995-08-24', 3, 'media/ES/jugadoras/ane.png', 166, 'right', 30000, 'https://www.soccerdonna.de/de/ane-etxezarreta/profil/spieler_40243.html', NULL, '2026-02-13 23:49:50'),
(229, 'Emma', 'Ramírez Gorgoso', 'Ramírez', '2002-05-10', 2, 'media/ES/jugadoras/emma.png', 167, 'right', 85000, 'https://www.soccerdonna.de/de/emma-ramirez/profil/spieler_47867.html', NULL, '2026-02-13 23:49:50'),
(230, 'Nora', 'Sarriegi Galdós', 'Nora', '2001-02-24', 10, 'media/ES/jugadoras/sarriegi.png', NULL, NULL, NULL, NULL, NULL, NULL),
(231, 'Manuela', 'Vanegas Cataño', 'Manuela', '2000-11-09', 3, 'media/CO/jugadoras/vanegas.png', NULL, NULL, NULL, NULL, NULL, NULL),
(232, 'Izarne', 'Sarasola Beain', 'Izarne', '2002-02-17', 4, 'media/ES/jugadoras/izarne.png', NULL, NULL, NULL, NULL, NULL, NULL),
(233, 'María', 'Valle López', 'Valle', '2004-11-14', 3, 'media/ES/jugadoras/valle.png', NULL, NULL, NULL, NULL, NULL, NULL),
(234, 'Nahia', 'Aparicio Jaular', 'Apari', '2004-01-07', 3, 'media/ES/jugadoras/apari.png', 168, 'right', 100000, 'https://www.soccerdonna.de/de/nahia-aparicio/profil/spieler_70693.html', NULL, '2026-02-13 23:49:51'),
(235, 'Claire', 'Lavogez', 'Claire', '1994-06-18', 10, 'media/FR/jugadoras/lavogez.png', 173, 'right', 80000, 'https://www.soccerdonna.de/de/claire-lavogez/profil/spieler_6152.html', NULL, '2026-02-13 23:49:52'),
(236, 'Klara', 'Cahynová', 'Centro', '1993-12-20', 6, 'media/CZ/jugadoras/cahynova.png', 178, 'right', 80000, 'https://www.soccerdonna.de/de/klara-cahynova/profil/spieler_11566.html', NULL, '2026-02-13 23:49:52'),
(237, 'Nerea', 'Eizagirre Lasa', 'Nerea', '2000-01-04', 11, 'media/ES/jugadoras/eizaguirre.png', 165, 'right', 190000, 'https://www.soccerdonna.de/de/nerea-eizagirre/profil/spieler_30427.html', NULL, '2026-02-13 23:49:53'),
(238, 'Andreia', 'De Jesus Jacinto', 'Andreia', '2002-06-08', 6, 'media/PT/jugadoras/andreia.png', 169, 'right', 450000, 'https://www.soccerdonna.de/de/andreia-jacinto/profil/spieler_40305.html', NULL, '2026-02-13 23:49:54'),
(239, 'Jacqueline', 'Owusu', 'Owusu', '2002-06-12', 5, 'media/GH/jugadoras/jacqueline.png', NULL, NULL, NULL, NULL, NULL, NULL),
(240, 'Elene', 'Viles Odriozola', 'Viles', '2001-07-02', 2, 'media/ES/jugadoras/viles.png', NULL, NULL, NULL, NULL, NULL, NULL),
(241, 'Cecilia', 'Marcos Nabal', 'Marcos', '2001-11-03', 11, 'media/ES/jugadoras/cecilia marcos.png', 158, 'left', 40000, 'https://www.soccerdonna.de/de/cecilia-marcos/profil/spieler_43218.html', NULL, '2026-02-13 23:49:55'),
(242, 'Sanni Maija', 'Franssi', 'Sanni', '1995-03-19', 10, 'media/FI/jugadoras/franssi.png', NULL, NULL, NULL, NULL, NULL, NULL),
(243, 'Lorena', 'Navarro Domínguez', 'Lorena', '2000-11-11', 5, 'media/ES/jugadoras/lorena.png', 151, 'left', 30000, 'https://www.soccerdonna.de/de/lorena-navarro/profil/spieler_30433.html', NULL, '2026-02-13 23:49:55'),
(244, 'Mirari', 'Uria Gabilondo', 'Mirari', '2003-01-01', 12, 'media/ES/jugadoras/mirari.png', 169, 'right', 35000, 'https://www.soccerdonna.de/de/mirari-uria/profil/spieler_42898.html', NULL, '2026-02-13 23:49:56'),
(245, 'Amaiur', 'Sarriegi Isasa', 'Amaiur', '2000-12-13', 12, 'media/ES/jugadoras/amaiur.png', 168, 'right', 175000, 'https://www.soccerdonna.de/de/amaiur-sarriegi/profil/spieler_42907.html', NULL, '2026-02-13 23:49:57'),
(246, 'Lucía', 'Pardo Méndez', 'Pardo', '2000-01-05', 10, 'media/ES/jugadoras/pardo.png', 170, 'right', 75000, 'https://www.soccerdonna.de/de/lucia-pardo/profil/spieler_51098.html', NULL, '2026-02-13 23:49:57'),
(247, 'Violeta', 'García Quiles', 'Quiles', '1999-12-10', 8, 'media/ES/jugadoras/quiles.png', 165, 'left', 30000, 'https://www.soccerdonna.de/de/violeta-quiles/profil/spieler_49381.html', NULL, '2026-02-13 23:49:58'),
(248, 'Andrea', 'Romero Burgos', 'Romero', '1995-02-13', 1, 'media/ES/jugadoras/andrea romero.png', NULL, NULL, NULL, NULL, NULL, NULL),
(249, 'Sandra', 'Estévez Ogalla', 'Ogalla', '2002-07-15', 1, 'media/ES/jugadoras/sandra estevez.png', NULL, NULL, NULL, NULL, NULL, NULL),
(250, 'Laura', 'Sánchez Comuñas', 'Laura', '2006-05-15', 1, 'media/ES/jugadoras/laura_sanchez.png', 170, 'right', 50000, 'https://www.soccerdonna.de/de/laura-sanchez/profil/spieler_66799.html', NULL, '2026-02-13 23:49:59'),
(251, 'Marta', 'Carrasco García', 'Carrasco', '1994-09-16', 3, 'media/ES/jugadoras/marta carrasco.png', NULL, NULL, NULL, NULL, NULL, NULL),
(252, 'Cristina', 'Postigo Martín', 'Cristina', '1998-04-27', 3, 'media/ES/jugadoras/postigo.png', 168, 'right', 55000, 'https://www.soccerdonna.de/de/cristina-postigo/profil/spieler_40215.html', NULL, '2026-02-13 23:49:59'),
(253, 'Alba', 'Pérez Manrique', 'Alba', '2000-06-18', 2, 'media/ES/jugadoras/alba perez.png', NULL, NULL, NULL, NULL, NULL, NULL),
(254, 'Naroa', 'Uriarte Urazurrutia', 'Naroa', '2001-02-05', 3, 'media/ES/jugadoras/naroa.png', 168, 'right', 30000, 'https://www.soccerdonna.de/de/naroa-uriarte/profil/spieler_35193.html', NULL, '2026-02-13 23:50:00'),
(255, 'Juliana', 'Aparecida Paulino Cardozo', 'Jujuba', '1991-09-06', 3, 'media/BR/jugadoras/jujuba.png', NULL, NULL, NULL, NULL, NULL, NULL),
(256, 'Isabel', 'Álvarez Tenorio', 'Isabel', '1999-06-12', 3, 'media/ES/jugadoras/isabel.png', 175, 'left', 60000, 'https://www.soccerdonna.de/de/isa-lvarez/profil/spieler_49292.html', NULL, '2026-02-13 23:50:01'),
(257, 'Clara', 'Rodríguez García', 'Clara', '2003-02-12', 4, 'media/ES/jugadoras/clara.png', 166, 'left', 30000, 'https://www.soccerdonna.de/de/clara-rodriguez/profil/spieler_48790.html', NULL, '2026-02-13 23:50:01'),
(258, 'María', 'De Los Ángeles Carrión Egido', 'Leles', '1997-02-22', 5, 'media/ES/jugadoras/leles.png', 165, 'right', 30000, 'https://www.soccerdonna.de/en/leles-carrion/profil/spieler_26623.html', NULL, '2026-02-13 23:50:02'),
(259, 'Ariadna', 'Mingueza García', 'Mingueza', '2003-03-22', 5, 'media/ES/jugadoras/ari min.png', 163, 'right', 60000, 'https://www.soccerdonna.de/de/ari-mingueza/profil/spieler_40415.html', NULL, '2026-02-13 23:50:03'),
(260, 'Ornella', 'María Vignola Cabot', 'Ornella', '2004-09-30', 8, 'media/ES/jugadoras/ornella.png', 164, 'right', 150000, 'https://www.soccerdonna.de/en/ornella-vignola/profil/spieler_40417.html', NULL, '2026-02-13 23:50:04'),
(261, 'Miku', 'Kojima', 'Miku', '1999-11-06', 9, 'media/JP/jugadoras/miku.png', 161, 'right', 35000, 'https://www.soccerdonna.de/de/miku-kojima/profil/spieler_49230.html', NULL, '2026-02-13 23:50:04'),
(262, 'Amaia', 'Iribarren Arteta', 'Amaia', '2003-06-06', 5, 'media/ES/jugadoras/amaia.png', 158, 'right', 30000, 'https://www.soccerdonna.de/de/amaia-iribarren/profil/spieler_51802.html', NULL, '2026-02-13 23:50:05'),
(263, 'Laura María', 'Pérez Martín', 'Laura', '1998-06-15', 9, 'media/ES/jugadoras/laura perez.png', NULL, NULL, 25000, 'https://www.soccerdonna.de/de/laura-marti/profil/spieler_51804.html', NULL, '2026-02-13 23:50:06');
INSERT INTO `jugadoras` (`id_jugadora`, `Nombre`, `Apellidos`, `Apodo`, `Nacimiento`, `Posicion`, `imagen`, `altura`, `pie_habil`, `market_value`, `soccerdonna_url`, `retiro`, `soccerdonna_last_updated`) VALUES
(264, 'Laura', 'Requena Sánchez', 'Lauri', '1990-05-25', 8, 'media/ES/jugadoras/lauri.png', 170, 'right', 30000, 'https://www.soccerdonna.de/en/lauri-requena/profil/spieler_21900.html', NULL, '2026-02-13 23:50:06'),
(265, 'Biljana', 'Bradić', 'Biljana', '1991-04-24', 10, 'media/RS/jugadoras/bradic.png', 170, 'right', 25000, 'https://www.soccerdonna.de/en/biljana-bradic/profil/spieler_21566.html', NULL, '2026-02-13 23:50:07'),
(266, 'Paula', 'Arana Montes', 'Arana', '2001-11-08', 11, 'media/ES/jugadoras/arana.png', 172, 'right', 40000, 'https://www.soccerdonna.de/de/paula-arana/profil/spieler_35177.html', NULL, '2026-02-13 23:50:08'),
(267, 'Lucía', 'Ramos Narváez', 'Lucía', '1999-09-13', 8, 'media/ES/jugadoras/ramos.png', 160, 'left', 25000, 'https://www.soccerdonna.de/en/lucia-ramos/profil/spieler_63193.html', NULL, '2026-02-13 23:50:08'),
(268, 'Edna', 'Imade', 'Imade', '2000-10-05', 10, 'media/NG/jugadoras/imade.png', 179, 'right', 550000, 'https://www.soccerdonna.de/en/edna-imade/profil/spieler_47634.html', '0000', '2026-02-13 23:50:09'),
(269, 'Andrea', 'Gómez Oliver', 'Gómez', '2003-05-14', 10, 'media/ES/jugadoras/gomez.png', 181, 'right', 30000, 'https://www.soccerdonna.de/de/andrea-gomez/profil/spieler_50134.html', NULL, '2026-02-13 23:50:10'),
(270, 'Alexia', 'Fernández Díaz', 'Alexia', '2002-05-28', 11, 'media/ES/jugadoras/alexia_fernandez.png', 164, 'right', 80000, 'https://www.soccerdonna.de/de/alexia-fernandez/profil/spieler_49268.html', '0000', '2026-02-13 23:50:11'),
(271, 'Inés', 'Rizo Galiano', 'Inés', '2004-11-12', 10, 'media/ES/jugadoras/inés rizo.png', 178, 'right', 30000, 'https://www.soccerdonna.de/en/ines-rizo/profil/spieler_63182.html', NULL, '2026-02-13 23:50:11'),
(272, 'Sydney', 'Joy Schertenleib', 'Sydney', '2007-01-30', 5, 'media/SUI/jugadoras/sydney.png', 178, 'right', 450000, 'https://www.soccerdonna.de/de/sydney-schertenleib/profil/spieler_72668.html', '0000', '2026-02-13 23:50:12'),
(290, 'María', 'Miralles Gascón', 'Gascón', '1997-05-28', 1, 'media/ES/jugadoras/gascon.png', 169, 'right', 35000, 'https://www.soccerdonna.de/de/maria-miralles/profil/spieler_42973.html', NULL, '2026-02-13 23:50:13'),
(291, 'Noelia', 'García Domenech', 'Noelia', '1992-09-25', 1, 'media/ES/jugadoras/noelia.png', 165, 'right', 25000, 'https://www.soccerdonna.de/en/noelia-garcia/profil/spieler_48961.html', NULL, '2026-02-13 23:50:13'),
(292, 'Elba', 'Vergés Prats', 'Elba', '1995-10-24', 3, 'media/ES/jugadoras/elba.png', 170, 'right', 65000, 'https://www.soccerdonna.de/de/elba-verges/profil/spieler_20404.html', NULL, '2026-02-13 23:50:14'),
(293, 'Andrea Maddalen', 'Sierra Larrauri', 'Andrea', '1998-05-15', 2, 'media/ES/jugadoras/sierra.png', 162, 'right', 30000, 'https://www.soccerdonna.de/en/andrea-sierra/profil/spieler_30742.html', NULL, '2026-02-13 23:50:15'),
(294, 'Patricia', 'Ojeda Ramírez', 'Ojeda', '1991-03-08', 3, 'media/ES/jugadoras/patri ojeda.png', 166, 'both', 25000, 'https://www.soccerdonna.de/de/patri-ojeda/profil/spieler_4913.html', NULL, '2026-02-13 23:50:15'),
(295, 'Alena', 'Pěčková', 'Alena', '2001-03-30', 3, 'media/CZ/jugadoras/alena.png', 171, 'left', 30000, 'https://www.soccerdonna.de/en/alena-pkova/profil/spieler_40007.html', NULL, '2026-02-13 23:50:16'),
(296, 'Annelie', 'Leitner', 'Annelie', '1996-06-15', 2, 'media/AT/jugadoras/annelie.png', 170, 'left', 30000, 'https://www.soccerdonna.de/de/annelie-leitner/profil/spieler_18865.html', NULL, '2026-02-13 23:50:17'),
(297, 'Carla', 'Andrés Abad', 'Carla', '2002-12-12', 3, 'media/ES/jugadoras/carla.png', 177, 'right', 50000, 'https://www.soccerdonna.de/de/carla-andres/profil/spieler_51999.html', NULL, '2026-02-13 23:50:17'),
(298, 'Eider', 'Arana Mugueta', 'Eider', '2002-04-11', 4, 'media/ES/jugadoras/eider.png', 170, 'left', 40000, 'https://www.soccerdonna.de/de/eider-arana/profil/spieler_47649.html', NULL, '2026-02-13 23:50:18'),
(299, 'Mireia', 'Masegur Torrent', 'Masegur', '2002-08-19', 3, 'media/ES/jugadoras/mireia.png', 170, 'right', 40000, 'https://www.soccerdonna.de/de/mireia-masegur/profil/spieler_60250.html', NULL, '2026-02-13 23:50:19'),
(300, 'Arene', 'Altonaga Etxebarria', 'Arene', '1993-02-25', 5, 'media/ES/jugadoras/arene.png', 159, 'right', 40000, 'https://www.soccerdonna.de/de/arene-altonaga/profil/spieler_21799.html', NULL, '2026-02-13 23:50:20'),
(301, 'Eva', 'Van Deursen', 'Eva', '1999-01-21', 5, 'media/NL/jugadoras/van deursen.png', 168, 'right', 25000, 'https://www.soccerdonna.de/de/eva-van-deursen/profil/spieler_35775.html', NULL, '2026-02-13 23:50:20'),
(302, 'Leire', 'Peña Ruiz', 'Leire', '2001-06-20', 6, 'media/ES/jugadoras/leire peña.png', 164, 'left', NULL, 'https://www.soccerdonna.de/en/leire-pea/profil/spieler_35188.html', NULL, '2026-02-13 23:50:21'),
(303, 'Amani', 'Kakounan Bernadette', 'Amani', '1997-09-05', 6, 'media/CI/jugadoras/amani.png', 164, 'right', 60000, 'https://www.soccerdonna.de/en/bernadette-amani/profil/spieler_51966.html', NULL, '2026-02-13 23:50:22'),
(304, 'Esperanza', 'Pizarro Pagalday', 'Pizarro', '2001-04-15', 5, 'media/UY/jugadoras/pizarro.png', 162, 'right', 50000, 'https://www.soccerdonna.de/de/espe-pizarro/profil/spieler_37830.html', NULL, '2026-02-13 23:50:22'),
(305, 'Ane', 'Campos Andueza', 'Campos', '1999-05-21', 10, 'media/ES/jugadoras/ane campos.png', 172, 'right', 35000, 'https://www.soccerdonna.de/de/ane-campos/profil/spieler_47843.html', NULL, '2026-02-13 23:50:23'),
(306, 'Margherita', 'Monnecchi', 'Monnecchi', '2001-11-06', 10, 'media/IT/jugadoras/monacchi.png', 170, 'right', 50000, 'https://www.soccerdonna.de/en/margherita-monnecchi/profil/spieler_42770.html', NULL, '2026-02-13 23:50:24'),
(307, 'Andrea Abigail', 'Álvarez Donis', 'Andrea', '2003-01-13', 10, 'media/GT/jugadoras/andrea.png', 165, 'right', 65000, 'https://www.soccerdonna.de/de/andrea-lvarez/profil/spieler_45165.html', NULL, '2026-02-13 23:50:24'),
(308, 'Laura', 'Camino Fernández', 'Laura', '2002-04-01', 11, 'media/ES/jugadoras/camino.png', 170, 'right', 40000, 'https://www.soccerdonna.de/de/laura-camino/profil/spieler_50755.html', NULL, '2026-02-13 23:50:25'),
(309, 'María', 'López Valenzuela', 'Valenzuela', '2002-11-26', 1, 'media/ES/jugadoras/valenzuela.png', 174, 'right', 45000, 'https://www.soccerdonna.de/de/maria-valenzuela/profil/spieler_37846.html', NULL, '2026-02-13 23:50:26'),
(310, 'Laura', 'Coronado Vílchez', 'Laura', '2003-04-06', 1, 'media/ES/jugadoras/coronado.png', 170, 'right', 40000, 'https://www.soccerdonna.de/en/laura-coronado/profil/spieler_40408.html', NULL, '2026-02-13 23:50:27'),
(311, 'Laia', 'García Dalmases', 'Laura', '2000-12-19', 1, 'media/ES/jugadoras/laia.png', 173, 'right', 25000, 'https://www.soccerdonna.de/en/laia-garcia/profil/spieler_47910.html', NULL, '2026-02-13 23:50:27'),
(312, 'Melanie', 'Serrano Pérez', 'Melanie', '1989-10-12', 3, 'media/ES/jugadoras/melanie.png', 169, 'left', 25000, 'https://www.soccerdonna.de/en/melanie-serrano/profil/spieler_3389.html', NULL, '2026-02-13 23:50:28'),
(313, 'Ana', 'González Rosa', 'Ana', '1995-03-26', 6, 'media/ES/jugadoras/ana g.png', 161, 'right', 40000, 'https://www.soccerdonna.de/de/ana-gonzalez/profil/spieler_38462.html', NULL, '2026-02-13 23:50:29'),
(314, 'Berta', 'Pujadas Boix', 'Berta', '2000-04-09', 3, 'media/ES/jugadoras/berta pujadas.png', 172, 'right', 50000, 'https://www.soccerdonna.de/de/berta-pujadas/profil/spieler_30434.html', NULL, '2026-02-13 23:50:29'),
(315, 'Cristina', 'Cubedo Pitarch', 'Cubedo', '1999-10-21', 3, 'media/ES/jugadoras/cubedo.png', 177, 'right', 45000, 'https://www.soccerdonna.de/de/cristina-cubedo/profil/spieler_39725.html', NULL, '2026-02-13 23:50:30'),
(316, 'Itziar', 'Pinillos Moreno', 'Itziar', '2000-10-21', 2, 'media/ES/jugadoras/itzi.png', 164, 'left', 60000, 'https://www.soccerdonna.de/de/itziar-pinillos/profil/spieler_34647.html', NULL, '2026-02-13 23:50:30'),
(317, 'Morgane', 'Nicoli', 'Morgane', '1997-04-07', 3, 'media/FR/jugadoras/nicoli.png', 175, 'right', NULL, 'https://www.soccerdonna.de/en/morgane-nicoli/profil/spieler_22114.html', NULL, '2026-02-13 23:50:31'),
(318, 'Sonia', 'García Majarín', 'Sonia', '2002-12-06', 6, 'media/ES/jugadoras/majarin.png', 170, 'left', 55000, 'https://www.soccerdonna.de/de/sonia-majarin/profil/spieler_40410.html', NULL, '2026-02-13 23:50:31'),
(319, 'Júlia', 'Mora Tobías', 'Júlia', '1997-10-14', 3, 'media/ES/jugadoras/julia mora.png', 168, 'right', 35000, 'https://www.soccerdonna.de/en/julia-mora/profil/spieler_48745.html', NULL, '2026-02-13 23:50:32'),
(320, 'Cristina', 'Baudet Lucena', 'Baudet', '1991-07-08', 7, 'media/ES/jugadoras/baudet.png', 165, 'right', 25000, 'https://www.soccerdonna.de/de/cristina-baudet/profil/spieler_4773.html', NULL, '2026-02-13 23:50:32'),
(321, 'Nuria', 'Garrote Camuñez', 'Garrote', '1997-06-10', 2, 'media/ES/jugadoras/nuria garr.png', 164, 'right', 35000, 'https://www.soccerdonna.de/de/nuria-garrote/profil/spieler_20414.html', NULL, '2026-02-13 23:50:33'),
(322, 'Estefanía Romina', 'Banini Ruiz', 'Banini', '1990-06-26', 5, 'media/AR/jugadoras/banini.png', 163, 'right', 30000, 'https://www.soccerdonna.de/de/estefania-banini/profil/spieler_27556.html', NULL, '2026-02-13 23:50:33'),
(323, 'María', 'Llompart Pons', 'Llompart', '2000-10-19', 5, 'media/ES/jugadoras/llompart.png', 161, 'right', 50000, 'https://www.soccerdonna.de/de/maria-llompart/profil/spieler_35566.html', NULL, '2026-02-13 23:50:34'),
(324, 'Young-Ju', 'Lee', 'Young', '1992-04-22', 6, 'media/KR/jugadoras/lee.png', NULL, NULL, NULL, NULL, NULL, NULL),
(325, 'Ghizlane', 'Chebbak', 'Ghizlane', '1990-08-22', 5, 'media/MA/jugadoras/cgebbak.png', NULL, NULL, NULL, NULL, NULL, NULL),
(326, 'Laura', 'Martínez González', 'Laura', '1999-01-29', 5, 'media/ES/jugadoras/laura.png', 158, 'right', 25000, 'https://www.soccerdonna.de/de/laura-martinez/profil/spieler_47872.html', NULL, '2026-02-13 23:50:34'),
(327, 'Rebecca Grace', 'Elloh Amon', 'Grace', '1994-12-25', 11, 'media/CI/jugadoras/rebecca.png', NULL, NULL, NULL, NULL, NULL, NULL),
(328, 'Macarena', 'Portales Nieto', 'Maca', '1998-08-02', 11, 'media/ES/jugadoras/maca.png', 162, 'right', 75000, 'https://www.soccerdonna.de/de/macarena-portales/profil/spieler_30732.html', NULL, '2026-02-13 23:50:35'),
(329, 'Elena', 'Julve Pérez', 'Julve', '2000-12-08', 12, 'media/ES/jugadoras/julve.png', 154, 'right', 55000, 'https://www.soccerdonna.de/de/elena-julve/profil/spieler_5490.html', NULL, '2026-02-13 23:50:35'),
(330, 'Irina Priscilla', 'Uribe García', 'Uribe', '1998-07-29', 10, 'media/ES/jugadoras/irina.png', 160, 'right', 30000, 'https://www.soccerdonna.de/de/irina-uribe/profil/spieler_49245.html', NULL, '2026-02-13 23:50:36'),
(331, 'María Del Pilar', 'Garrote Camuñez', 'Pilar', '1997-06-10', 5, 'media/ES/jugadoras/pilar.png', NULL, NULL, NULL, NULL, NULL, NULL),
(332, 'Paola', 'Ulloa Jiménez', 'Paola U.J.M.', '1996-12-26', 1, 'media/ES/jugadoras/ulloa.png', 164, 'right', 45000, 'https://www.soccerdonna.de/de/paola-ulloa/profil/spieler_40291.html', NULL, '2026-02-13 23:50:37'),
(333, 'Belén', 'De Gracia Ruiz', 'Belén', '2004-04-12', 1, 'media/ES/jugadoras/belen.png', 170, 'right', 30000, 'https://www.soccerdonna.de/de/belen-de-gracia/profil/spieler_63229.html', NULL, '2026-02-13 23:50:37'),
(334, 'Núria', 'Mendoza Miralles', 'N. Mendoza', '1995-12-15', 3, 'media/ES/jugadoras/mendo.png', 169, 'right', 100000, 'https://www.soccerdonna.de/de/nuria-mendoza/profil/spieler_4757.html', NULL, '2026-02-13 23:50:38'),
(335, 'Mónica', 'Hickmann Alves', 'Mônica', '1987-04-21', 3, 'media/BR/jugadoras/monica.png', 172, 'right', 25000, 'https://www.soccerdonna.de/de/monica-hickmann/profil/spieler_2519.html', NULL, '2026-02-13 23:50:39'),
(336, 'Allegra', 'Poljak', 'Allegra', '1999-02-05', 4, 'media/RS/jugadoras/allegra.png', 162, 'right', 85000, 'https://www.soccerdonna.de/de/allegra-poljak/profil/spieler_28906.html', NULL, '2026-02-13 23:50:39'),
(337, 'Aldana', 'Cometti', 'Cometti', '1996-03-03', 3, 'media/AR/jugadoras/cometti.png', NULL, NULL, NULL, NULL, NULL, NULL),
(338, 'Esther', 'Laborde Cabanillas', 'Esther', '2004-04-20', 2, 'media/ES/jugadoras/laborde.png', 160, 'left', 55000, 'https://www.soccerdonna.de/de/esther-laborde/profil/spieler_40412.html', NULL, '2026-02-13 23:50:40'),
(339, 'Sandra', 'Villafañe Serrada', 'Villafañe', '2005-09-18', 3, 'media/ES/jugadoras/villafañe.png', 169, 'right', 80000, 'https://www.soccerdonna.de/de/sandra-villafae/profil/spieler_57101.html', NULL, '2026-02-13 23:50:41'),
(340, 'Freja Siri', 'Olofsson', 'Freja Siri', '1998-05-24', 6, 'media/SE/jugadoras/freja.png', 174, 'right', 30000, 'https://www.soccerdonna.de/de/freja-siri-olofsson/profil/spieler_28682.html', NULL, '2026-02-13 23:50:42'),
(341, 'Hildur', 'Antonsdottir', 'Antonsdottir', '1995-09-18', 5, 'media/IS/jugadoras/antonsdottir.png', 165, 'right', 70000, 'https://www.soccerdonna.de/de/hildur-antonsdottir/profil/spieler_31041.html', NULL, '2026-02-13 23:50:42'),
(342, 'Karen Andrea', 'Araya Ponce', 'Araya', '1990-10-16', 5, 'media/CL/jugadoras/araya.png', NULL, NULL, NULL, NULL, NULL, NULL),
(343, 'María Florencia', 'Bonsegundo', 'Bonsegundo', '1993-07-14', 7, 'media/AR/jugadoras/bonsegundo.png', NULL, NULL, NULL, NULL, NULL, NULL),
(344, 'Malou', 'Marcetto Rylov', 'Marcetto', '2003-04-16', 6, 'media/DK/jugadoras/marcetto.png', 178, 'right', 70000, 'https://www.soccerdonna.de/de/malou-marcetto/profil/spieler_37423.html', NULL, '2026-02-13 23:50:43'),
(345, 'Marina', 'Rivas Jaén', 'Marina', '2005-07-02', 5, 'media/ES/jugadoras/marina.png', 160, 'right', 30000, 'https://www.soccerdonna.de/de/marina-rivas/profil/spieler_53428.html', NULL, '2026-02-13 23:50:44'),
(346, 'Cristina', 'Librán Quiroga', 'Librán', '2006-06-11', 5, 'media/ES/jugadoras/libran.png', 165, 'right', 70000, 'https://www.soccerdonna.de/en/cristina-libran/profil/spieler_55505.html', NULL, '2026-02-13 23:50:44'),
(347, 'Paula', 'León Breña', 'Paula León', '2001-01-23', 10, 'media/ES/jugadoras/paula leon.png', NULL, NULL, NULL, NULL, NULL, NULL),
(348, 'Alba', 'Ruiz Soto', 'A. Ruiz', '2003-06-20', 10, 'media/ES/jugadoras/alba.png', 165, 'right', 35000, 'https://www.soccerdonna.de/de/alba-ruiz/profil/spieler_50748.html', NULL, '2026-02-13 23:50:45'),
(349, 'Laura', 'Domínguez Rojo', 'Laurita', '1997-08-12', 8, 'media/ES/jugadoras/laurita.png', NULL, NULL, NULL, NULL, NULL, NULL),
(350, 'Emily', 'Assis De Carvalho', 'Emily', '2002-02-22', 12, 'media/BR/jugadoras/emily.png', NULL, NULL, NULL, NULL, NULL, NULL),
(351, 'Kamilla', 'Melgård', 'Melgård', '2005-12-16', 10, 'media/NO/jugadoras/melgard.png', 163, 'right', 65000, 'https://www.soccerdonna.de/de/kamilla-melgrd/profil/spieler_58716.html', NULL, '2026-02-13 23:50:46'),
(352, 'Bárbara', 'López Gorrado', 'Bárbara', '2005-08-30', 10, 'media/ES/jugadoras/barbara.png', 163, 'right', 35000, 'https://www.soccerdonna.de/de/barbara-lopez/profil/spieler_74724.html', NULL, '2026-02-13 23:50:47'),
(353, 'Kayla Jay', 'McKenna', 'McKenna', '1996-09-03', 10, 'media/JM/jugadoras/McKenna.png', NULL, NULL, NULL, NULL, NULL, NULL),
(354, 'Noelia', 'Ramos Álvarez', 'Noelia Ramos', '1999-02-10', 1, 'media/ES/jugadoras/noelia ramos.png', 169, 'right', 80000, 'https://www.soccerdonna.de/de/noelia-ramos/profil/spieler_30436.html', NULL, '2026-02-13 23:50:47'),
(355, 'María', 'Echezarreta Fernández', 'Cheza', '2001-07-19', 1, 'media/ES/jugadoras/cheza.png', 174, 'right', 25000, 'https://www.soccerdonna.de/de/maria-echezarreta/profil/spieler_35557.html', NULL, '2026-02-13 23:50:48'),
(356, 'Nekane', 'Morales Morán', 'N. Morales', '2002-05-19', 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(357, 'María', 'Estella Del Valle', 'Estella', '1994-06-10', 2, NULL, 170, 'right', 30000, 'https://www.soccerdonna.de/de/maria-estella/profil/spieler_21871.html', NULL, '2026-02-13 23:50:49'),
(358, 'Cinta', 'Rodríguez Toronjo', 'Cinta R.', '1999-11-07', 3, 'media/ES/jugadoras/cinta.png', 178, 'right', 65000, 'https://www.soccerdonna.de/de/cinta-rodriguez/profil/spieler_40282.html', NULL, '2026-02-13 23:50:49'),
(359, 'Raquel', 'Peña Rodríguez', 'Pisco', '1988-12-20', 4, 'media/ES/jugadoras/pisco.png', NULL, NULL, NULL, NULL, NULL, NULL),
(360, 'Beatriz', 'Beltrán Sanz', 'B. Beltrán', '1997-12-10', 4, 'media/ES/jugadoras/bea beltrán.png', NULL, NULL, NULL, NULL, NULL, NULL),
(361, 'Claudia', 'Roldán Blanco', 'Clau Blanco', '1997-03-11', 4, 'media/ES/jugadoras/clau blanco.png', 152, 'right', 40000, 'https://www.soccerdonna.de/de/clau-blanco/profil/spieler_38474.html', NULL, '2026-02-13 23:50:50'),
(362, 'Andrea', 'Marrero Avero', 'A. Marrero', '1996-10-06', 3, 'media/ES/jugadoras/marrero.png', NULL, NULL, NULL, NULL, NULL, NULL),
(363, 'Thais Cristina', 'Da Silva Ferreira', 'Thaís Ferreira', '1996-05-01', 3, 'media/BR/jugadoras/thais ferreira.png', NULL, NULL, NULL, NULL, NULL, NULL),
(364, 'Barbara Crisbelis', 'Martinez Flores', 'B. Martinez', '2003-04-22', 5, 'media/VE/jugadoras/crisbelis.png', NULL, NULL, NULL, NULL, NULL, NULL),
(365, 'Sandra', 'Castelló Oliver', 'S. Castelló', '1993-08-07', 6, 'media/ES/jugadoras/castelló.png', 171, 'both', 35000, 'https://www.soccerdonna.de/de/sandra-castello/profil/spieler_15857.html', NULL, '2026-02-13 23:50:51'),
(366, 'Patricia', 'Gavira Collado', 'Patri Gavira', '1989-04-26', 3, 'media/ES/jugadoras/gavira.png', 171, 'left', 25000, 'https://www.soccerdonna.de/de/patri-gavira/profil/spieler_20627.html', NULL, '2026-02-13 23:50:51'),
(367, 'Natalia', 'Ramos Álvarez', 'N. Ramos', '1999-02-10', 6, 'media/ES/jugadoras/natalia ramos.png', 171, 'right', 90000, 'https://www.soccerdonna.de/de/natalia-ramos/profil/spieler_30435.html', NULL, '2026-02-13 23:50:52'),
(368, 'Yerliane Glamar', 'Moreno Hernández', 'Moreno', '2000-10-13', 5, 'media/VE/jugadoras/yerliane.png', 163, 'right', 75000, 'https://www.soccerdonna.de/de/yerliane-moreno/profil/spieler_31611.html', NULL, '2026-02-13 23:50:53'),
(369, 'Lucía', 'Méndez Méndez', 'L. Méndez', '1999-02-19', 5, 'media/ES/jugadoras/lucía méndez.png', NULL, NULL, NULL, NULL, NULL, NULL),
(370, 'Paola', 'Hernández Díaz', 'Paola H.D.', '2002-07-25', 5, 'media/ES/jugadoras/paola hernández.png', 163, 'right', 70000, 'https://www.soccerdonna.de/de/paola-hernandez/profil/spieler_35182.html', NULL, '2026-02-13 23:50:53'),
(371, 'Claudia', 'Iglesias De La Cruz', 'Bicho', '2003-08-30', 5, 'media/ES/jugadoras/bicho.png', NULL, NULL, NULL, NULL, NULL, NULL),
(372, 'Ainhoa', 'Delgado', 'Ainhoa Delgado', '2004-07-02', 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(373, 'María José', 'Pérez González', 'Mari Jose', '1984-03-19', 11, 'media/ES/jugadoras/mari jose.png', NULL, NULL, NULL, NULL, NULL, NULL),
(374, 'Koko Ange Mariette Christelle', 'N\'guessan N\'Guessan', 'Koko Ange', '1990-11-18', 12, 'media/CI/jugadoras/koko ange.png', NULL, NULL, NULL, NULL, NULL, NULL),
(375, 'Rinsola', 'Babajide', 'Babajide', '1998-06-17', 12, 'media/NG/jugadoras/babajide.png', NULL, NULL, NULL, NULL, NULL, NULL),
(376, 'Nina', 'Richard', 'Richard', '2000-06-09', 5, 'media/FR/jugadoras/richard.png', NULL, NULL, NULL, NULL, NULL, NULL),
(377, 'Aleksandra', 'Zaremba Kupiec', 'Aleksandra', '2001-02-19', 2, 'media/PL/jugadoras/zaremba.png', 165, 'right', 90000, 'https://www.soccerdonna.de/de/aleksandra-zaremba/profil/spieler_39732.html', '0000', '2026-02-13 23:50:54'),
(378, 'Sakina', 'Ouzraoui Diki', 'S. Ouzraoui', '2001-08-29', 10, 'media/MA/jugadoras/ouzraoui.png', 164, 'right', 75000, 'https://www.soccerdonna.de/de/sakina-ouzraoui/profil/spieler_36116.html', NULL, '2026-02-13 23:50:54'),
(379, 'Gift Nyakno', 'Monday', 'Monday G.', '2001-12-09', 11, 'media/NG/jugadoras/monday.png', NULL, NULL, NULL, NULL, NULL, NULL),
(380, 'Jassina', 'Blom', 'Blom', '1994-09-03', 10, 'media/BE/jugadoras/blom.png', 168, 'right', 40000, 'https://www.soccerdonna.de/de/jassina-blom/profil/spieler_20697.html', NULL, '2026-02-13 23:50:55'),
(381, 'Jackie Noëlle', 'Groenen', 'Groenen', '1994-12-17', 5, 'media/NL/jugadoras/groenen.png', 165, 'right', 275000, 'https://www.soccerdonna.de/de/jackie-groenen/profil/spieler_6920.html', '0000', '2026-02-13 23:50:55'),
(382, 'Lotte', 'Keukelaar', 'Lotte', '2005-09-25', 10, 'media/NL/jugadoras/lotte_keukelaar.png', 171, 'right', 175000, 'https://www.soccerdonna.de/de/lotte-keukelaar/profil/spieler_62810.html', NULL, '2026-02-13 23:50:56'),
(383, 'Jill Jamie', 'Roord ', 'Roord', '1997-04-22', 7, 'media/NL/jugadoras/jill roord.png', 175, 'right', 300000, 'https://www.soccerdonna.de/de/jill-roord/profil/spieler_20273.html', NULL, '2026-02-13 23:50:56'),
(384, 'Daphne', 'van Domselaar', 'Daph', '2000-03-06', 1, 'media/NL/jugadoras/Daphne van Doomselaar.png', 176, 'right', 170000, 'https://www.soccerdonna.de/de/daphne-van-domselaar/profil/spieler_34025.html', NULL, '2026-02-13 23:50:57'),
(386, 'María Victoria', 'Losada Gómez', 'Losada', '1991-03-05', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(387, 'Nuria', 'Rabano Blanco', 'Rabano', '1999-06-15', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(388, 'María Paz', 'Vilas Dono', 'Mapi', '1988-02-01', 10, 'media/ES/jugadoras/mapigol.png', NULL, NULL, NULL, NULL, '2023', NULL),
(389, 'Bruna', 'Vilamala Costa', 'Bruna', '2002-06-04', 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(390, 'Giulia', 'Dragoni', 'Dragoni', '2006-11-07', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(391, 'Ana', 'Tejada Jimenez', 'Tejada', '2002-06-02', 3, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(392, 'Celia', 'Jiménez Delgado', 'Celia', '1995-06-20', 3, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(393, 'Sonia', 'Prim Fernández', 'Prim', '1984-11-05', 3, NULL, NULL, NULL, NULL, NULL, '2019', NULL),
(394, 'Erika', 'Vázquez Morales', 'Erika V.', '1983-02-16', 10, NULL, NULL, NULL, NULL, NULL, '2022', NULL),
(395, 'Sonia', 'Bermúdez Tribano', 'Sonia', '1984-11-15', 10, NULL, NULL, NULL, NULL, NULL, '2020', NULL),
(396, 'Ruth', 'García García', 'Ruth', '1987-03-26', 3, NULL, NULL, NULL, NULL, NULL, '2020', NULL),
(397, 'Cristina', 'Martín-Prieto Gutiérrez', 'Martín-Prieto', '1993-03-14', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(398, 'Laura', 'Ràfols Parellada', 'Ràfols', '1990-06-23', 1, NULL, NULL, NULL, NULL, NULL, '2018', NULL),
(399, 'Ana María', 'Romero Moreno', 'Willy', '1987-06-14', 10, NULL, NULL, NULL, NULL, NULL, '2020', NULL),
(400, 'Paula', 'Nicart Mejías', 'Nicart', '1994-09-08', 3, NULL, NULL, NULL, NULL, NULL, '2022', NULL),
(401, 'Lucia', 'García Córdoba', 'Lucia', '1998-11-14', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(402, 'Olga', 'García Pérez', 'Olga', '1992-06-01', 10, NULL, NULL, NULL, NULL, NULL, '2024', NULL),
(403, 'Mariví', 'Simó Marco', 'Mariví', '1983-04-25', 3, NULL, NULL, NULL, NULL, NULL, '2016', NULL),
(404, 'Virginia', 'Torrecilla Reyes', 'Torrecilla', '1994-09-04', 5, NULL, NULL, NULL, NULL, NULL, '2024', NULL),
(405, 'Maitane', 'López Millán', 'Mai', '1995-03-13', 5, NULL, 176, 'right', 80000, 'https://www.soccerdonna.de/en/maitane-lopez/profil/spieler_21951.html', '0000', '2026-02-13 23:50:57'),
(406, 'Paula', 'Tomas Serer', 'Tomi', '2001-09-11', 4, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(407, 'Inmaculada', 'Gabarro Romero', 'Gabarro', '2002-11-05', 5, 'media/ES/jugadoras/gabarro.png', 160, 'right', 100000, 'https://www.soccerdonna.de/en/inma-gabarro/profil/spieler_43216.html', '0000', '2026-02-25 11:26:49'),
(408, 'Oihane', 'Valdezate Cabornero', 'Valdezate', '2000-04-10', 5, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(409, 'Paula', 'Domínguez Encinas', 'Pauleta', '1997-08-11', 5, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(410, 'Ivana', 'Andrés Sanz', 'Ivana', '1994-07-13', 3, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(411, 'Julia', 'Bartel Holgado', 'Bartel', '2004-05-18', 5, 'media/ES/jugadoras/bartel.png', 161, 'right', 65000, 'https://www.soccerdonna.de/de/julia-bartel/profil/spieler_40406.html', '0000', '2026-02-13 23:50:58'),
(412, 'Ariana', 'Arias Jiménez', 'Ari', '2003-05-25', 10, 'media/ES/jugadoras/ari_arias.png', 172, 'right', 30000, 'https://www.soccerdonna.de/en/ariana-arias/profil/spieler_41593.html', '0000', '2026-02-13 23:50:58'),
(413, 'Verónica Charlyn', 'Corral Ang', 'Charlyn', '1991-09-11', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(414, 'Jennifer', 'Hermoso Fuentes', 'Jenni', '1990-05-09', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(415, 'Marta', 'Corredera Rueda', 'Corredera', '1991-08-08', 3, NULL, NULL, NULL, NULL, NULL, '2023', NULL),
(416, 'Laura ', 'Gutiérrez Navarro', 'Guti', '1994-05-02', 5, NULL, NULL, NULL, NULL, NULL, '2020', NULL),
(417, 'Lucia', 'Gómez García', 'Luci', '1996-10-11', 3, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(418, 'Andrea', 'Sánchez Falcón', 'Falcón', '1997-02-28', 4, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(419, 'Sandra', 'Paños García-Villamil', 'Paños', '1992-11-04', 1, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(420, 'Andrea', 'Pereira Cejudo', 'Pere', '1993-09-19', 3, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(421, 'Veronica', 'Boquete Giadans', 'Vero', '1987-04-09', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(422, 'Leila', 'Ouahabi El Ouahabi', 'Leia', '1993-03-22', 4, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(423, 'Carla', 'Julià Martínez', 'Julià', '2006-12-14', 3, 'media/ES/jugadoras/julia.png', 170, 'left', 50000, 'https://www.soccerdonna.de/en/carla-julia/profil/spieler_85559.html', '0000', '2026-02-25 10:03:48'),
(424, 'Laia', 'Codina Panedas', 'Codina', '2000-01-22', 3, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(425, 'Maria Francesca', 'Caldentey Oliver', 'Mariona', '1996-03-19', 11, 'media/ES/jugadoras/mariona.png', 166, 'right', 1300000, 'https://www.soccerdonna.de/en/mariona-caldentey/profil/spieler_20817.html', '0000', '2026-02-25 11:35:56'),
(426, 'Esther', 'González Rodríguez', 'Esther', '1992-12-08', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(427, 'Claudia', 'Zornoza Sánchez', 'Zornoza', '1990-10-20', 5, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(428, 'Beatriz ', 'Parra Salas', 'Bea Parra', '1987-07-31', 5, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(429, 'Kheira', 'Hamraoui ', 'Hamraoui ', '1990-01-13', 5, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(430, 'Anna Maria', 'Crnogorcevic', 'Crnogorcevic', '1990-10-03', 4, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(431, 'Alejandra', 'Bernabé de Santiago', 'Alejandra', '2001-11-12', 4, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(432, 'Marta', 'Cazalla Garcia', 'Cazalla', '1997-04-05', 3, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(433, 'Marta', 'Vieira Da Silva', 'Marta Vieira', '1986-02-19', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(434, 'Ludmila', 'da Silva', 'Ludmila', '1994-12-01', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(435, 'Claudia Christiane ', 'Endler Mutinelli', 'Endler', '1991-07-23', 1, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(436, 'Sofie', 'Svava', 'Svava', '2000-08-11', 3, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(437, 'Damaris Berta', 'Egurrola Wienke', 'Damaris', '1999-08-26', 5, 'media/NL/jugadoras/damaris.png', 176, 'right', 575000, 'https://www.soccerdonna.de/de/damaris-egurrola/profil/spieler_30426.html', '0000', '2026-02-13 23:50:59'),
(438, 'Ada Martine', 'Stolsmo Hegerberg', 'Ada Hegerberg', '1995-07-10', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(439, 'Nataša', 'Andonova', 'Andonova', '1993-12-04', 10, NULL, 170, 'left', 60000, 'https://www.soccerdonna.de/de/natasa-andonova/profil/spieler_3899.html', '0000', '2026-02-13 23:51:00'),
(440, 'Andreea María', 'Paraluta', 'Paraluta', '1994-11-27', 1, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(441, 'Wendie', 'Thérèse Renard', 'Renard', '1990-07-20', 3, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(442, 'Ellie', 'Madison Carpenter', 'Carpenter', '2000-04-28', 3, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(443, 'Kadeisha', 'Buchanan', 'Buchanan', '1995-11-05', 3, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(444, 'Amandine ', 'Chantal Henry', 'Henry', '1989-09-28', 5, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(445, 'Eugénie Anne', 'Claudine Le Sommer', 'Le Sommer', '1989-05-18', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(446, 'Catarina Cantanhede ', 'Melônio Macário', 'Macário', '1999-10-04', 5, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(447, 'Delphine', 'Cascarino', 'Cascarino', '1997-02-05', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(448, 'Selma', 'Bacha', 'Bacha', '2000-11-09', 4, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(449, 'Daniëlle', 'van de Donk', 'van de Donk', '1991-08-05', 5, 'media/NL/jugadoras/van de donk.png', 160, 'right', 150000, 'https://www.soccerdonna.de/de/danille-van-de-donk/profil/spieler_2900.html', '0000', '2026-02-13 23:51:00'),
(450, 'Kadidiatou', 'Diani', 'Diani', '1995-04-01', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(451, 'Alexandra', 'Popp', 'Popp', '1991-04-06', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(452, 'Lena', 'Sophie Oberdorf', 'Oberdorf', '2001-12-19', 5, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(453, 'Danique ', 'Tolhoek', 'Tolhoek', '2005-03-17', 10, 'media/NL/jugadoras/tolhoek.png', 168, 'right', 200000, 'https://www.soccerdonna.de/de/danique-tolhoek/profil/spieler_63443.html', NULL, '2026-02-13 23:51:01'),
(454, 'Sveindís', 'Jane Jónsdóttir', 'Jónsdóttir', '2001-06-05', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(455, 'Zećira', 'Musovic', 'Musovic', '1996-05-26', 1, 'media/SE/jugadoras/musovic.png', 180, 'right', 80000, 'https://www.soccerdonna.de/en/zecira-musovic/profil/spieler_18814.html', '0000', '2026-02-24 10:06:46'),
(456, 'Hannah', 'Alice Hampton', 'Hampton', '2000-11-16', 1, 'media/ENG/jugadoras/hampton.png', 175, 'right', 210000, 'https://www.soccerdonna.de/en/hannah-hampton/profil/spieler_34581.html', '0000', '2026-02-24 13:43:37'),
(457, 'Ashley', 'Elizabeth Lawrence', 'Lawrence', '1995-06-11', 5, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(458, 'Lucía Roberta', 'Tough Bronze', 'Bronze', '1991-11-28', 2, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(459, 'Sandy', 'Madeleine Baltimore', 'Baltimore', '2000-02-19', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(460, 'Keira', 'Fae Walsh', 'Walsh', '1997-04-08', 5, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(461, 'Mayra Tatiana', 'Ramírez Ramírez', 'Mayra', '1999-03-25', 10, 'media/CO/jugadoras/mayra.png', 176, 'right', 750000, 'https://www.soccerdonna.de/en/mayra-ramirez/profil/spieler_49036.html', '0000', '2026-02-25 09:10:36'),
(462, 'Lauren', 'James', 'James', '2001-09-29', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(463, 'Pernille', 'Mosegaard Harder', 'Harder', '1992-11-15', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(464, 'Samantha', 'May Kerr', 'Kerr', '1993-11-10', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(465, 'Viola', 'Mónica Calligaris', 'Calligaris', '1996-03-17', 5, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(466, 'Anna Margaretha Marina', 'Astrid Miedema', 'Miedema', '1996-07-15', 10, 'media/NL/jugadoras/miedema.png', 175, 'right', 425000, 'https://www.soccerdonna.de/de/vivianne-miedema/profil/spieler_9241.html', '0000', '2026-02-13 23:51:01'),
(467, 'Lauren', 'May Hemp', 'Hemp', '2000-08-07', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(468, 'Pauline', 'Peyraud-Magnin', 'Pauline', '1992-03-17', 1, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(469, 'Elena', 'Linari', 'Linari', '1994-04-15', 3, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(471, 'Christine', 'Margaret Sinclair ', 'Sinclair ', '1983-07-12', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(472, 'Kosovare', 'Asllani', 'Asllani', '1989-07-29', 10, 'media/SE/jugadoras/asllani.png', 166, 'right', 125000, 'https://www.soccerdonna.de/en/kosovare-asllani/profil/spieler_68.html', '0000', '2026-02-24 10:09:59'),
(473, 'Sofia', 'Jakobsson', 'Jakobsson', '1990-04-23', 10, 'media/SE/jugadoras/jakobsson.png', 174, 'right', 50000, 'https://www.soccerdonna.de/en/sofia-jakobsson/profil/spieler_2444.html', '0000', '2026-02-24 18:20:33'),
(474, 'Regina', 'van Eijk', 'van Eijk', '2002-03-09', 1, 'media/NL/jugadoras/van-eijk.png', 174, 'right', 70000, 'https://www.soccerdonna.de/de/regina-van-eijk/profil/spieler_53391.html', '0000', '2026-02-13 23:51:02'),
(475, 'Bo', 'van Egmond', 'van Egmond', '2006-11-13', 11, 'media/NL/jugadoras/van-egmond.png', 175, 'right', 80000, 'https://www.soccerdonna.de/de/bo-van-egmond/profil/spieler_77702.html', NULL, '2026-02-13 23:51:02'),
(476, 'Ranneke', 'Derks', 'Derks', '2008-04-29', 10, 'media/NL/jugadoras/derks.png', 168, 'right', 70000, 'https://www.soccerdonna.de/de/ranneke-derks/profil/spieler_86954.html', NULL, '2026-02-13 23:51:03'),
(477, 'Laia', 'Aleixandri López', 'Aleixandri', '2000-08-25', 3, 'media/ES/jugadoras/aleixandri.png', 170, 'right', 750000, 'https://www.soccerdonna.de/de/laia-aleixandri/profil/spieler_30421.html', '0000', '2026-02-13 23:51:03'),
(478, 'Liv Anne', 'Pennock', 'Pennock', '2008-02-27', 10, 'media/NL/jugadoras/pennock.png', 179, 'right', 10000, 'https://www.soccerdonna.de/en/liv-pennock/profil/spieler_86960.html', '0000', '2026-02-24 18:31:11'),
(479, 'Jaimy', 'Ravensbergen', 'Jaimy', '2001-03-19', 10, 'media/NL/jugadoras/jaimy.png', 179, 'right', 140000, 'https://www.soccerdonna.de/en/jaimy-ravensbergen/profil/spieler_40050.html', '0000', '2026-02-24 18:37:11'),
(480, 'Danique', 'Noordman', 'Noordman', '2004-02-21', 5, 'media/NL/jugadoras/noordman.png', 168, 'right', 55000, 'https://www.soccerdonna.de/en/danique-noordman/profil/spieler_47248.html', '0000', '2026-02-24 18:56:01'),
(481, 'Dominique', 'Janssen', 'Janssen', '1995-01-17', 3, 'media/NL/jugadoras/janssen.png', 175, 'both', 250000, 'https://www.soccerdonna.de/en/dominique-janssen/profil/spieler_19416.html', '0000', '2026-02-24 19:37:14'),
(482, 'Sherida', 'Spitse', 'Spitse', '1990-05-29', 3, 'media/NL/jugadoras/spitse.png', 166, 'right', 25000, 'https://www.soccerdonna.de/en/sherida-spitse/profil/spieler_1838.html', '0000', '2026-02-24 19:42:43'),
(483, 'Desiree', 'van Lunteren', 'Lunteren', '1992-12-30', 2, 'media/NL/jugadoras/lunteren.png', 170, 'right', 40000, 'https://www.soccerdonna.de/en/desiree-van-lunteren/profil/spieler_2727.html', '0000', '2026-02-25 08:44:56'),
(484, 'Clara', 'Serrajordi Díaz', 'Serrajordi', '2007-12-07', 5, 'media/ES/jugadoras/serrajordi.png', 170, 'right', 150000, 'https://www.soccerdonna.de/en/clara-serrajordi/profil/spieler_92032.html', '0000', '2026-02-25 09:28:58'),
(485, 'Aïcha', 'Cámara Cámara', 'Aïcha', '2006-12-11', 3, 'media/ES/jugadoras/aicha.png', 167, 'right', 100000, 'https://www.soccerdonna.de/en/aicha-camara/profil/spieler_78529.html', '0000', '2026-02-25 09:44:32'),
(486, 'Ona', 'Baradad Rius', 'Baradad', '2024-04-16', 10, 'media/ES/jugadoras/baradad.png', 163, 'right', 50000, 'https://www.soccerdonna.de/en/ona-baradad/profil/spieler_48777.html', '0000', '2026-02-25 09:49:47'),
(487, 'Ainhoa', 'Domènech Cedrés', 'Domenech', '2005-07-21', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(488, 'Isabelle Naomi', 'Louise Hoekstra', 'Hoekstra', '2003-07-31', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(489, 'Olivia', 'Fergusson', 'Fergusson', '1995-03-27', 10, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(490, 'Ariadna', 'Domènech Cedrés', 'Ariadna', '2005-07-21', 3, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(491, 'Meritxell', 'Muñoz Alsina', 'Meritxell', '2003-06-18', 1, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(492, 'Ane', 'Bordagaray Casado ', 'Ane', '2008-03-25', 3, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(493, 'Irati', 'Alfaro Nagore', 'Irati', '2004-05-27', 3, NULL, NULL, NULL, NULL, NULL, '0000', NULL),
(494, 'Martine', 'Fenger', 'Fenger', '2006-10-09', 10, 'media/NO/jugadoras/fenger.png', 178, 'both', 45000, 'https://www.soccerdonna.de/en/martine-fenger/profil/spieler_60694.html', '0000', '2026-02-25 10:11:27'),
(495, 'Laia', 'Martret', 'Martret', '2005-08-28', 12, 'media/ES/jugadoras/martret.png', 164, 'left', NULL, 'https://www.soccerdonna.de/en/laia-martret/profil/spieler_53593.html', '0000', '2026-02-25 10:16:57'),
(496, 'Anna', 'Álvarez Llopis', 'Álvarez', '2008-01-17', 1, 'media/ES/jugadoras/anna_alvarez.png', 178, 'right', 30000, 'https://www.soccerdonna.de/en/anna-lvarez/profil/spieler_84060.html', '0000', '2026-02-25 10:25:32'),
(497, 'Alma', 'Velasco Heim', 'Alma', '2006-04-13', 3, 'media/ES/jugadoras/alma.png', 169, 'right', 30000, 'https://www.soccerdonna.de/en/alma-velasco/profil/spieler_80308.html', '0000', '2026-02-25 10:28:50'),
(498, 'Daniela', 'Luque Fernández', 'Luque', '2006-11-02', 9, 'media/ES/jugadoras/luque.png', 166, 'right', 25000, 'https://www.soccerdonna.de/en/daniela-luque/profil/spieler_76328.html', '0000', '2026-02-25 10:36:11'),
(499, 'Dolores Isabel', 'da Silva', 'Dolores', '1991-08-07', 5, 'media/PT/jugadoras/dolores.png', 167, 'right', 35000, 'https://www.soccerdonna.de/en/dolores-silva/profil/spieler_6949.html', '0000', '2026-02-25 10:40:56'),
(500, 'Lucía', 'González Comin', 'Gonzi', '2006-03-02', 9, 'media/ES/jugadoras/gonzi.png', 165, 'right', 25000, 'https://www.soccerdonna.de/en/lucia-gonzalez-benito/profil/spieler_80871.html', '0000', '2026-02-25 10:50:18'),
(501, 'Smilla Hilma', 'Holmberg', 'Holmberg', '2006-10-11', 3, 'media/SE/jugadoras/holmberg.png', 171, 'right', 375000, 'https://www.soccerdonna.de/en/smilla-holmberg/profil/spieler_65685.html', '0000', '2026-02-25 14:19:04'),
(502, 'Janou Johanna Theodora', 'Levels', 'Levels', '2000-10-30', 4, 'media/NL/jugadoras/levels.png', 160, 'left', 180000, 'https://www.soccerdonna.de/en/janou-levels/profil/spieler_35660.html', '0000', '2026-02-26 00:00:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ligas`
--

CREATE TABLE `ligas` (
  `id_liga` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `logo` text DEFAULT NULL,
  `pais` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ligas`
--

INSERT INTO `ligas` (`id_liga`, `nombre`, `logo`, `pais`) VALUES
(1, 'Liga F', 'media/ES/ligas/liga f.png', 1),
(2, 'NWSL', 'media/US/ligas/eeuu1.png', 18),
(3, 'GPFB', 'media/DE/ligas/ger1.png', 15),
(4, 'Première League', 'media/FR/ligas/fra1.png', 4),
(5, 'FA WSL', 'media/ENG/ligas/eng1.png', 2),
(6, 'Vrouwen Eredivisie', 'media/NL/ligas/Vrouwen_Eredivisie.png', 7),
(7, 'Primera Federación', 'media/ES/ligas/esp2.png', 1),
(8, 'Damallsvenskan', 'media/SE/ligas/damallsvenskan.png', 16),
(9, 'BeNe', 'media/NL/ligas/old/BeNe.png', 7),
(10, 'Toppserien', 'media/NO/ligas/toppserien-logo.png', 3),
(11, 'Ekstraliga', 'media/PL/ligas/Ekstraliga.png', 14),
(12, 'Liga BPI', 'media/PT/ligas/Liga_BPI.png', 41),
(13, 'Brasileirao Femenino', 'media/BR/ligas/br1.png', 27),
(14, 'Liga Femenina BetPlay Dimayor', 'media/CO/ligas/Liga_Femenina_Betplay_Dimayor_Colombia.png', 26),
(15, 'Retiradas', '', 50),
(16, 'Equipos Disueltos', '', 50),
(17, 'Serie A Femminile', 'media/IT/ligas/it1.png', 6),
(18, '2. Bundesliga Femenina', 'media/DE/ligas/ger2.png', 15),
(19, 'Liga MX Femenil', 'media/MX/ligas/mx1.png', 21),
(20, 'Liga Femenina', 'media/CL/ligas/cl1.png', 25),
(21, 'Segunda Federación', 'media/ES/ligas/esp3.png', 1),
(22, 'Tercera Federación', 'media/ES/ligas/esp4.png', 1),
(23, 'FA WSL2', 'media/ENG/ligas/eng2.png', 2),
(24, 'Swiss Super League', 'media/SUI/ligas/AWSL.png', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

CREATE TABLE `paises` (
  `id_pais` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `iso` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paises`
--

INSERT INTO `paises` (`id_pais`, `nombre`, `iso`) VALUES
(1, 'España', 'es'),
(2, 'Inglaterra', 'gb-eng'),
(3, 'Noruega', 'no'),
(4, 'Francia', 'fr'),
(5, 'Ucrania', 'ua'),
(6, 'Italia', 'it'),
(7, 'Paises Bajos', 'nl'),
(8, 'Suiza', 'ch'),
(9, 'Serbia', 'rs'),
(10, 'Georgia', 'ge'),
(11, 'Rumania', 'ro'),
(12, 'Macedonia', 'mk'),
(13, 'Montenegro', 'me'),
(14, 'Polonia', 'pl'),
(15, 'Alemania', 'de'),
(16, 'Suecia', 'se'),
(17, 'Dinamarca', 'dk'),
(18, 'Estados Unidos', 'us'),
(19, 'Paraguay', 'py'),
(20, 'Uruguay', 'uy'),
(21, 'Mexico', 'mx'),
(22, 'Venezuela', 've'),
(23, 'Canada', 'ca'),
(24, 'Guatemala', 'gt'),
(25, 'Chile', 'cl'),
(26, 'Colombia', 'co'),
(27, 'Brasil', 'br'),
(28, 'Argentina', 'ar'),
(29, 'Costa Rica', 'cr'),
(30, 'Marruecos', 'ma'),
(31, 'Zambia', 'zm'),
(32, 'Camerun', 'cm'),
(33, 'Costa de Marfil', 'ci'),
(34, 'Ghana', 'gh'),
(35, 'Namibia', 'na'),
(36, 'Nigeria', 'ng'),
(37, 'Corea del Sur', 'kr'),
(38, 'Japon', 'jp'),
(39, 'Australia', 'au'),
(40, 'Russia', 'ru'),
(41, 'Portugal', 'pt'),
(42, 'Jamaica', 'jm'),
(43, 'Escocia', 'gb-sct'),
(44, 'Eslovaquia', 'sk'),
(45, 'República Checa', 'cz'),
(46, 'Austria', 'at'),
(47, 'Islandia', 'is'),
(48, 'Bélgica', 'be'),
(49, 'Finlandia', 'fi'),
(50, 'Mundo', ''),
(51, 'Ecuador', 'ec'),
(52, 'Surinam', 'sr'),
(53, 'Bosnia & Herzegonina', 'ba'),
(54, 'Kosovo', 'xk'),
(55, 'Guinea Ecuatorial', 'gq'),
(56, 'Gambia', 'gm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pistas`
--

CREATE TABLE `pistas` (
  `id_juego` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `valor` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pistas`
--

INSERT INTO `pistas` (`id_juego`, `descripcion`, `valor`) VALUES
(1, 'Guess Trayectoria', '{\"idJugadora\": \"1\"}'),
(2, 'Wordle', '{\"idJugadora\": \"1\"}'),
(3, 'Adivina Jugadora', '{\"idJugadora\": \"25\"}'),
(4, 'Grid', '{\"club4\":\"7\",\"club5\":\"6\",\"club6\":\"3\",\"club1\":\"23\",\"club2\":\"1\",\"club3\":\"5\"}'),
(5, 'Compañeras', '{\"idJugadora\":\"23\"}'),
(6, 'FutFemBingo', '{\"paises\": [1, 16, 7], \"equipos\": [1, 23, 2], \"ligas\": [1,2,3], \"trofeos\": [1]}\r\n'),
(7, 'Futfem Clubs', '{\"equipo\": \"1\", \"temporada\": \"2021\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posiciones`
--

CREATE TABLE `posiciones` (
  `idPosicion` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `abreviatura` text NOT NULL,
  `idPosicionPadre` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `posiciones`
--

INSERT INTO `posiciones` (`idPosicion`, `nombre`, `abreviatura`, `idPosicionPadre`) VALUES
(1, 'Portera', 'POR', NULL),
(2, 'Lateral Derecha', 'LD', 3),
(3, 'Defensa', 'DFC', NULL),
(4, 'Lateral Izquierda', 'LI', 3),
(5, 'Mediocentro', 'MC', NULL),
(6, 'Mediocentro Defensivo', 'MCD', 5),
(7, 'Mediocentro ofensivo', 'MCO', 5),
(8, 'Mediocentro Izquierda', 'MI', 5),
(9, 'Mediocentro Derecha', 'MD', 5),
(10, 'Delantera', 'DC', NULL),
(11, 'Extremo Izquierda', 'EI', 10),
(12, 'Extremo Derecha', 'ED', 10),
(13, 'Sin determinar', 'TBD', 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rachas`
--

CREATE TABLE `rachas` (
  `id` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `juego` int(11) NOT NULL,
  `racha_actual` int(11) NOT NULL,
  `mejor_racha` int(11) NOT NULL,
  `ultima_respuesta` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rachas`
--

INSERT INTO `rachas` (`id`, `usuario`, `juego`, `racha_actual`, `mejor_racha`, `ultima_respuesta`) VALUES
(1, 8, 1, 13, 13, '1'),
(2, 8, 2, 9, 9, '[{\"guess\":[\"a\",\"l\",\"h\",\"a\",\"r\",\"i\",\"l\",\"l\",\"a\"],\"result\":[\"correct\",\"correct\",\"correct\",\"correct\",\"correct\",\"correct\",\"correct\",\"correct\",\"correct\"],\"answer\":\"27\"}]'),
(3, 8, 3, 13, 13, '{\"jugadoras\":[\"1\",\"26\",\"19\"],\"vidas\":8,\"answer\":null}'),
(4, 8, 4, 0, 0, '[{\"celda\":\"c11\",\"foto\":\"media/NL/jugadoras/likitaaa.png\"},{\"celda\":\"c31\",\"foto\":\"media/ES/jugadoras/paredes.png\"},{\"celda\":\"c12\",\"foto\":\"media/SE/jugadoras/frido.png\"},{\"answer\":\"loss5103816\"}]'),
(5, 8, 5, 6, 0, '1'),
(6, 8, 6, 5, 5, '[{\"celda\":\"c21\",\"foto\":null},{\"celda\":\"c32\",\"foto\":\"media/NL/jugadoras/Daphne van Doomselaar.png\"},{\"celda\":\"c24\",\"foto\":\"media/NL/jugadoras/spitse.png\"},{\"celda\":\"c23\",\"foto\":\"media/NL/jugadoras/lunteren.png\"},{\"celda\":\"c34\",\"foto\":null},{\"celda\":\"c12\",\"foto\":\"media/SE/jugadoras/frido.png\"},{\"celda\":\"c13\",\"foto\":\"media/ES/jugadoras/salma.png\"},{\"celda\":\"c14\",\"foto\":null},{\"celda\":\"c22\",\"foto\":\"media/ES/jugadoras/moli.png\"},{\"celda\":\"c33\",\"foto\":\"media/SE/jugadoras/emmaaa.png\"},{\"celda\":\"c31\",\"foto\":\"media/NL/jugadoras/noordman.png\"},{\"celda\":\"c11\",\"foto\":\"media/SE/jugadoras/frido.png\",\"answer\":\"116712321231\"}]'),
(9, 8, 7, 9, 58, 'undefined'),
(15, 12, 7, 6, 0, 'undefined'),
(16, 12, 1, 3, 3, '1'),
(17, 12, 6, 1, 0, '[{\"celda\":\"c14\",\"foto\":\"media/ES/jugadoras/gabal.png\"},{\"celda\":\"c22\",\"foto\":null},{\"celda\":\"c13\",\"foto\":\"media/SS/jugadoras/weir.png\"},{\"celda\":\"c11\",\"foto\":\"media/NL/jugadoras/likitaaa.png\"},{\"celda\":\"c32\",\"foto\":\"media/NL/jugadoras/jill roord.png\"},{\"celda\":\"c21\",\"foto\":\"media/ES/jugadoras/azkona.png\"},{\"celda\":\"c24\",\"foto\":null},{\"celda\":\"c31\",\"foto\":\"media/NL/jugadoras/lunteren.png\"},{\"celda\":\"c34\",\"foto\":null},{\"celda\":\"c12\",\"foto\":\"media/ES/jugadoras/salma.png\"},{\"celda\":\"c23\",\"foto\":\"media/SE/jugadoras/frido.png\"},{\"celda\":\"c33\",\"foto\":\"media/SE/jugadoras/holmberg.png\",\"answer\":\"116712321231\"}]'),
(18, 12, 2, 1, 1, '[{\"guess\":[\"e\",\"m\",\"m\",\"a\",\"a\"],\"result\":[\"present\",\"absent\",\"absent\",\"absent\",\"absent\"]},{\"guess\":[\"m\",\"a\",\"r\",\"t\",\"n\"],\"result\":[\"absent\",\"absent\",\"absent\",\"absent\",\"absent\"]},{\"guess\":[\"w\",\"i\",\"e\",\"k\",\"e\"],\"result\":[\"absent\",\"correct\",\"correct\",\"correct\",\"correct\"]},{\"guess\":[\"l\",\"i\",\"e\",\"k\",\"e\"],\"result\":[\"correct\",\"correct\",\"correct\",\"correct\",\"correct\"],\"answer\":\"1\"}]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `Nombre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `Nombre`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trayectoria`
--

CREATE TABLE `trayectoria` (
  `id` int(11) NOT NULL,
  `jugadora` int(11) NOT NULL,
  `equipo` int(11) NOT NULL,
  `años` text NOT NULL,
  `imagen` text DEFAULT NULL,
  `equipo_actual` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trayectoria`
--

INSERT INTO `trayectoria` (`id`, `jugadora`, `equipo`, `años`, `imagen`, `equipo_actual`) VALUES
(1, 1, 1, '2017-2022', 'media/ES/trayectorias/lieke-barsa.jpg', 0),
(2, 2, 21, '2016-2024', NULL, 0),
(3, 3, 12, '2019-2020', NULL, 0),
(4, 5, 3, '2016-2021', NULL, 0),
(5, 5, 10, '2011-2016', NULL, 0),
(6, 5, 8, '2008-2011', NULL, 0),
(7, 6, 26, '2004-2013', NULL, 0),
(8, 7, 6, '2014-2017', NULL, 0),
(9, 7, 26, '2013-2014', NULL, 0),
(10, 8, 22, '2020-2023', NULL, 0),
(11, 8, 2, '2018-2020', NULL, 0),
(12, 8, 9, '2017-2018', NULL, 0),
(13, 11, 2, '2011-2012', NULL, 0),
(14, 11, 26, '2010-2011', NULL, 0),
(15, 14, 5, '2019-2021', NULL, 0),
(16, 15, 21, '2014-2022', NULL, 0),
(17, 17, 5, '2015-2024', NULL, 0),
(18, 19, 5, '2019-2021', NULL, 0),
(19, 19, 14, '2017-2019', NULL, 0),
(20, 18, 5, '2014-2019', NULL, 0),
(21, 20, 12, '2020-2021', NULL, 0),
(22, 21, 27, '2019-2022', NULL, 0),
(23, 23, 28, '2019-2021', NULL, 0),
(24, 24, 24, '2020-2023', NULL, 0),
(25, 1, 29, '2016-2017', 'media/ES/trayectorias/lieke-rosengard.jpg', 0),
(26, 1, 30, '2014-2015', 'media/ES/trayectorias/lieke-goteborg.jpg', 0),
(27, 1, 31, '2013-2014', 'media/ES/trayectorias/lieke-fcr.jpg\r\n', 0),
(28, 1, 32, '2011-2012', 'media/ES/trayectorias/lieke-liege.jpg', 0),
(29, 1, 33, '2010-2011', 'media/ES/trayectorias/lieke-venlo.jpg', 0),
(30, 1, 34, '2009-2010', 'media/ES/trayectorias/lieke-heerenveen.jpg', 0),
(31, 3, 35, '2016-2019', NULL, 0),
(32, 1, 3, '2022-2025', 'media\\ES\\trayectorias\\lieke-psg.jpg', 0),
(33, 2, 1, '2024-2025', NULL, 0),
(34, 3, 1, '2020-act', NULL, 1),
(35, 4, 1, '2016-act', NULL, 1),
(36, 5, 1, '2021-act', NULL, 1),
(37, 6, 1, '2013-act', NULL, 1),
(38, 7, 1, '2017-act', NULL, 1),
(39, 8, 1, '2023-act', NULL, 1),
(40, 4, 36, '2016-2021', NULL, 0),
(41, 8, 36, '2014-2016', NULL, 0),
(42, 9, 1, '2021-2025', NULL, 0),
(43, 9, 36, '2018-2021', NULL, 0),
(44, 10, 1, '2024-2025', NULL, 0),
(45, 10, 36, '2020-2024', NULL, 0),
(46, 11, 1, '2012-act', NULL, 1),
(47, 12, 1, '2015-act', NULL, 1),
(48, 12, 35, '2014-2015', NULL, 0),
(49, 13, 1, '2016-act', NULL, 1),
(50, 13, 36, '2013-2016', NULL, 0),
(51, 14, 37, '2018-2019', NULL, 0),
(52, 14, 1, '2021-2025', NULL, 0),
(53, 14, 38, '2014-2018', NULL, 0),
(54, 15, 1, '2022-2024', NULL, 0),
(55, 16, 1, '2024-act', NULL, 1),
(56, 16, 36, '2022-2024', NULL, 0),
(57, 16, 9, '2021-2022', NULL, 0),
(58, 17, 1, '2024-act', NULL, 1),
(59, 17, 39, '2011-2015', NULL, 0),
(60, 18, 1, '2019-act', NULL, 1),
(61, 18, 40, '2013-2014', NULL, 0),
(62, 18, 41, '2010-2013', NULL, 0),
(63, 19, 1, '2021-2025', NULL, 0),
(64, 19, 42, '2014-2016', NULL, 0),
(65, 19, 43, '2011-2014', NULL, 0),
(66, 20, 1, '2021-act', NULL, 1),
(67, 20, 36, '2017-2020', NULL, 0),
(68, 21, 1, '2022-act', NULL, 1),
(69, 21, 44, '2017-2019', NULL, 0),
(70, 22, 1, '2024-act', NULL, 1),
(71, 22, 45, '2018-2024', NULL, 0),
(72, 23, 2, '2021-act', NULL, 1),
(73, 24, 1, '2023-act', NULL, 1),
(74, 25, 2, '2023-2025', NULL, 0),
(75, 25, 4, '2021-2023', NULL, 0),
(76, 25, 46, '2021', NULL, 0),
(77, 25, 47, '2020', NULL, 0),
(78, 25, 42, '2019', NULL, 0),
(79, 25, 48, '2017-2018', NULL, 0),
(80, 25, 49, '2014-2016', NULL, 0),
(81, 25, 50, '2013-2014', NULL, 0),
(82, 25, 51, '2012', NULL, 0),
(83, 26, 2, '2020-act', NULL, 1),
(84, 26, 11, '2015-2020', NULL, 0),
(85, 27, 2, '2012-act', NULL, 1),
(86, 27, 52, '2010-2012', NULL, 0),
(87, 27, 53, '2009-2010', NULL, 0),
(88, 28, 2, '2024-2025', NULL, 0),
(89, 28, 11, '2022-2024', NULL, 0),
(90, 28, 36, '2020-2022', NULL, 0),
(91, 28, 26, '2019-2020', NULL, 0),
(92, 29, 2, '2024-act', NULL, 1),
(93, 29, 12, '2020-2024', NULL, 0),
(94, 29, 54, '2019-2020', NULL, 0),
(95, 30, 2, '2020-2025', NULL, 0),
(96, 30, 11, '2019-2020', NULL, 0),
(97, 31, 2, '2024-act', NULL, 1),
(98, 31, 52, '2022-2024', NULL, 0),
(99, 32, 2, '2021-act', NULL, 1),
(100, 33, 2, '2020-act', NULL, 1),
(101, 34, 2, '2023-2025', NULL, 0),
(102, 34, 13, '2020-2023', NULL, 0),
(103, 34, 6, '2014-2020', NULL, 0),
(104, 34, 52, '2013-2014', NULL, 0),
(105, 34, 12, '2009-2013', NULL, 0),
(106, 35, 2, '2024-2025', NULL, 0),
(107, 35, 55, '2023-2024', NULL, 0),
(108, 35, 56, '2022-2023', NULL, 0),
(109, 35, 57, '2021-2022', NULL, 0),
(110, 35, 56, '2020-2021', NULL, 0),
(111, 35, 57, '2019-2020', NULL, 0),
(112, 35, 17, '2017-2018', NULL, 0),
(113, 35, 58, '2017', NULL, 0),
(114, 35, 3, '2015-2019', NULL, 0),
(115, 36, 2, '2022-2025', NULL, 0),
(116, 36, 59, '2019-2022', NULL, 0),
(117, 36, 60, '2017-2019', NULL, 0),
(118, 36, 36, '2013-2017', NULL, 0),
(119, 37, 2, '2023-2025', NULL, 0),
(120, 37, 11, '2020-2023', NULL, 0),
(121, 37, 26, '2018-2020', NULL, 0),
(122, 37, 36, '2014-2018', NULL, 0),
(123, 38, 2, '2019-act', NULL, 1),
(124, 39, 2, '2024-act', NULL, 1),
(125, 39, 61, '2020-2024', NULL, 0),
(126, 39, 59, '2014-2020', NULL, 0),
(127, 40, 2, '2023-2025', NULL, 0),
(128, 40, 62, '2021-2023', NULL, 0),
(129, 40, 63, '2016-2021', NULL, 0),
(130, 41, 2, '2023-2024', NULL, 0),
(131, 41, 9, '2021-2023', NULL, 0),
(132, 41, 64, '2016-2021', NULL, 0),
(133, 42, 2, '2024-act', NULL, 1),
(134, 42, 12, '2017-2024', NULL, 0),
(135, 42, 65, '2014-2017', NULL, 0),
(136, 43, 2, '2024-2025', NULL, 0),
(137, 43, 11, '2022-2024', NULL, 0),
(138, 43, 66, '2021-2022', NULL, 0),
(139, 43, 67, '2020-2021', NULL, 0),
(140, 43, 68, '2019-2020', NULL, 0),
(141, 43, 69, '2018-2019', NULL, 0),
(142, 44, 70, '2008-2010', NULL, 0),
(143, 44, 25, '2010-2015', NULL, 0),
(144, 44, 18, '2015-2019', NULL, 0),
(145, 44, 6, '2019-2020', NULL, 0),
(146, 44, 24, '2020-2022', NULL, 0),
(147, 45, 71, '2022-2024', NULL, 0),
(148, 45, 72, '2021-2022', NULL, 0),
(149, 45, 73, '2020', NULL, 0),
(150, 45, 72, '2017-2020', NULL, 0),
(151, 45, 4, '2016-2017', NULL, 0),
(152, 45, 72, '2016', NULL, 0),
(153, 45, 74, '2013-2015', NULL, 0),
(154, 45, 75, '2012', NULL, 0),
(155, 45, 76, '2011', NULL, 0),
(156, 45, 77, '2010', NULL, 0),
(157, 46, 6, '2021-act', NULL, 1),
(158, 47, 6, '2023-act', NULL, 1),
(159, 48, 6, '2022-2025', NULL, 0),
(160, 49, 6, '2016-act', NULL, 1),
(161, 50, 6, '2024-act', NULL, 1),
(162, 51, 6, '2024-act', NULL, 1),
(163, 52, 6, '2024-act', NULL, 1),
(164, 53, 6, '2022-act', NULL, 1),
(165, 54, 6, '2022-act', NULL, 1),
(166, 55, 6, '2024-act', NULL, 1),
(167, 56, 6, '2022-act', NULL, 0),
(168, 57, 6, '2023-2025', NULL, 0),
(169, 58, 6, '2024-act', NULL, 1),
(170, 59, 6, '2023-act', NULL, 1),
(171, 60, 6, '2024-act', NULL, 1),
(172, 61, 6, '2022-act', NULL, 1),
(173, 62, 6, '2023-act', NULL, 1),
(174, 63, 6, '2024-act', NULL, 1),
(175, 64, 6, '2021-act', NULL, 1),
(176, 65, 6, '2024-act', NULL, 1),
(177, 66, 6, '2024-act', NULL, 1),
(178, 67, 55, '2022-2023', NULL, 0),
(179, 68, 11, '2018-2025', NULL, 0),
(180, 69, 11, '2025-act', NULL, 1),
(181, 70, 11, '2025-act', NULL, 1),
(182, 71, 11, '2025-act', NULL, 1),
(183, 72, 11, '2025-act', NULL, 1),
(184, 73, 11, '2025-act', NULL, 1),
(185, 74, 11, '2024-2025', NULL, 0),
(186, 75, 11, '2025-act', NULL, 1),
(187, 76, 11, '2024-2025', NULL, 0),
(188, 77, 11, '2025-act', NULL, 1),
(189, 78, 11, '2025-act', NULL, 1),
(190, 79, 11, '2025-act', NULL, 1),
(191, 80, 11, '2025-act', NULL, 1),
(192, 81, 11, '2025-act', NULL, 1),
(193, 82, 11, '2025-act', NULL, 1),
(194, 83, 11, '2025-act', NULL, 1),
(195, 84, 11, '2025-act', NULL, 1),
(196, 85, 11, '2025-act', NULL, 1),
(197, 86, 11, '2025-act', NULL, 1),
(198, 87, 11, '2025-act', NULL, 1),
(199, 88, 11, '2019-2025', NULL, 0),
(200, 89, 11, '2024-2025', NULL, 0),
(201, 90, 11, '2025-act', NULL, 1),
(202, 91, 10, '2025-act', NULL, 1),
(203, 92, 10, '2023-act', NULL, 1),
(204, 93, 10, '2025-act', NULL, 1),
(205, 94, 10, '2025-act', NULL, 1),
(206, 95, 10, '2025-act', NULL, 1),
(207, 96, 10, '2025-act', NULL, 1),
(208, 97, 10, '2025-act', NULL, 1),
(209, 98, 10, '2025-act', NULL, 1),
(210, 99, 10, '2025-act', NULL, 1),
(211, 100, 10, '2025-act', NULL, 1),
(212, 101, 10, '2021-act', NULL, 1),
(213, 102, 10, '2025-act', NULL, 1),
(214, 103, 10, '2021-2025', NULL, 0),
(215, 104, 10, '2025-act', NULL, 1),
(216, 105, 10, '2025-act', NULL, 1),
(217, 106, 10, '2025-act', NULL, 1),
(218, 107, 10, '2025-act', NULL, 1),
(219, 108, 10, '2025-act', NULL, 1),
(220, 109, 10, '2025-act', NULL, 1),
(221, 110, 10, '2025-act', NULL, 1),
(222, 111, 10, '2025-act', NULL, 1),
(223, 112, 10, '2025-act', NULL, 1),
(224, 113, 10, '2025-act', NULL, 1),
(225, 114, 10, '2025-act', NULL, 1),
(226, 115, 26, '2024-2025', NULL, 1),
(227, 116, 26, '2024-2025', NULL, 1),
(228, 117, 26, '2024-2025', NULL, 1),
(229, 118, 26, '2024-2025', NULL, 1),
(230, 119, 26, '2024-2025', NULL, 1),
(231, 120, 26, '2024-2025', NULL, 1),
(232, 121, 26, '2024-2025', NULL, 1),
(233, 122, 26, '2024-2025', NULL, 1),
(234, 123, 26, '2024-2025', NULL, 1),
(235, 124, 26, '2024-2025', NULL, 1),
(236, 125, 26, '2024-2025', NULL, 1),
(237, 126, 26, '2024-2025', NULL, 1),
(238, 127, 26, '2024-2025', NULL, 1),
(239, 128, 26, '2024-2025', NULL, 0),
(240, 129, 26, '2024-2025', NULL, 1),
(241, 130, 26, '2024-2025', NULL, 1),
(242, 131, 26, '2024-2025', NULL, 1),
(243, 132, 26, '2024-2025', NULL, 1),
(244, 133, 26, '2024-2025', NULL, 1),
(245, 134, 26, '2024-2025', NULL, 1),
(246, 135, 26, '2024-2025', NULL, 1),
(247, 136, 26, '2024-2025', NULL, 1),
(248, 137, 7, '2025-act', NULL, 1),
(249, 138, 7, '2025-act', NULL, 1),
(250, 139, 7, '2025-act', NULL, 1),
(251, 140, 7, '2025-act', NULL, 1),
(252, 141, 7, '2025-act', NULL, 1),
(253, 142, 7, '2025-act', NULL, 1),
(254, 143, 7, '2025-act', NULL, 1),
(255, 144, 7, '2025-act', NULL, 1),
(256, 145, 7, '2025-act', NULL, 1),
(257, 146, 7, '2025-act', NULL, 1),
(258, 147, 7, '2025-act', NULL, 1),
(259, 148, 7, '2025-act', NULL, 1),
(260, 149, 7, '2025-act', NULL, 1),
(261, 150, 7, '2025-act', NULL, 1),
(262, 151, 7, '2025-act', NULL, 1),
(263, 152, 7, '2025-act', NULL, 1),
(264, 153, 7, '2025-act', NULL, 1),
(265, 154, 7, '2025-act', NULL, 1),
(266, 155, 7, '2025-act', NULL, 1),
(267, 156, 7, '2025-act', NULL, 1),
(268, 157, 7, '2025-act', NULL, 1),
(269, 158, 7, '2025-act', NULL, 1),
(270, 159, 7, '2025-act', NULL, 1),
(271, 160, 12, '2025-act', NULL, 1),
(272, 161, 12, '2025-act', NULL, 1),
(273, 162, 12, '2025-act', NULL, 1),
(274, 163, 12, '2025-act', NULL, 1),
(275, 164, 12, '2025-act', NULL, 1),
(276, 165, 12, '2025-act', NULL, 1),
(277, 166, 12, '2025-act', NULL, 1),
(278, 167, 12, '2025-act', NULL, 1),
(279, 168, 12, '2025-act', NULL, 1),
(280, 169, 12, '2025-act', NULL, 1),
(281, 170, 12, '2025-act', NULL, 1),
(282, 171, 12, '2025-act', NULL, 1),
(283, 172, 12, '2025-act', NULL, 1),
(284, 173, 12, '2025-act', NULL, 1),
(285, 174, 12, '2025-act', NULL, 1),
(286, 175, 12, '2025-act', NULL, 1),
(287, 176, 12, '2025-act', NULL, 1),
(288, 177, 12, '2025-act', NULL, 1),
(289, 178, 12, '2025-act', NULL, 1),
(290, 179, 12, '2025-act', NULL, 1),
(291, 180, 12, '2025-act', NULL, 1),
(292, 182, 78, '2025-act', NULL, 1),
(293, 183, 78, '2025-act', NULL, 1),
(294, 184, 78, '2025-act', NULL, 1),
(295, 185, 78, '2025-act', NULL, 1),
(296, 186, 78, '2025-act', NULL, 1),
(297, 187, 78, '2025-act', NULL, 1),
(298, 188, 78, '2025-act', NULL, 1),
(299, 189, 78, '2025-act', NULL, 1),
(300, 190, 78, '2025-act', NULL, 1),
(301, 191, 78, '2025-act', NULL, 1),
(302, 192, 78, '2025-act', NULL, 1),
(303, 193, 78, '2025-act', NULL, 1),
(304, 194, 78, '2025-act', NULL, 1),
(305, 195, 78, '2025-act', NULL, 1),
(306, 196, 78, '2025-act', NULL, 1),
(307, 197, 78, '2025-act', NULL, 1),
(308, 198, 78, '2025-act', NULL, 1),
(309, 199, 78, '2025-act', NULL, 1),
(310, 200, 78, '2025-act', NULL, 1),
(311, 201, 78, '2025-act', NULL, 1),
(312, 202, 13, '2025-act', NULL, 1),
(313, 203, 13, '2025-act', NULL, 1),
(314, 204, 13, '2025-act', NULL, 1),
(315, 205, 13, '2025-act', NULL, 1),
(316, 206, 13, '2025-act', NULL, 1),
(317, 207, 13, '2025-act', NULL, 1),
(318, 208, 13, '2024-2025', NULL, 0),
(319, 209, 13, '2025-act', NULL, 1),
(320, 210, 13, '2025-act', NULL, 1),
(321, 211, 13, '2025-act', NULL, 1),
(322, 212, 13, '2025-act', NULL, 1),
(323, 213, 13, '2025-act', NULL, 1),
(324, 214, 13, '2025-act', NULL, 1),
(325, 215, 13, '2024-2025', NULL, 0),
(326, 216, 13, '2016-2025', NULL, 0),
(327, 217, 13, '2025-act', NULL, 1),
(328, 218, 13, '2023-2025', NULL, 0),
(329, 219, 13, '2025-act', NULL, 1),
(330, 220, 13, '2025-act', NULL, 1),
(331, 221, 13, '2025-act', NULL, 1),
(332, 222, 13, '2025-act', NULL, 1),
(333, 223, 13, '2025-act', NULL, 1),
(334, 224, 13, '2025-act', NULL, 1),
(335, 225, 8, '2023-2025', NULL, 0),
(336, 226, 8, '2023-', NULL, 1),
(337, 227, 8, '2023-', NULL, 1),
(338, 228, 8, '2023-', NULL, 1),
(339, 229, 8, '2023-', NULL, 1),
(340, 230, 8, '2023-', NULL, 1),
(341, 231, 8, '2023-', NULL, 1),
(342, 232, 8, '2023-', NULL, 1),
(343, 233, 8, '2023-', NULL, 1),
(344, 234, 8, '2023-', NULL, 1),
(345, 235, 8, '2023-', NULL, 1),
(346, 236, 8, '2023-', NULL, 1),
(347, 237, 8, '2023-', NULL, 1),
(348, 238, 8, '2023-', NULL, 1),
(349, 239, 8, '2023-', NULL, 1),
(350, 240, 8, '2023-', NULL, 1),
(351, 241, 8, '2023-', NULL, 1),
(352, 242, 8, '2023-', NULL, 1),
(353, 243, 8, '2023-', NULL, 1),
(354, 244, 8, '2023-', NULL, 1),
(355, 245, 8, '2023-2025', NULL, 0),
(356, 246, 8, '2023-', NULL, 1),
(357, 247, 8, '2023-', NULL, 1),
(358, 248, 79, '2023-', NULL, 1),
(359, 249, 79, '2023-', NULL, 1),
(360, 250, 79, '2023-', NULL, 1),
(361, 251, 79, '2023-', NULL, 1),
(362, 252, 79, '2023-', NULL, 1),
(363, 253, 79, '2023-', NULL, 1),
(364, 254, 79, '2023-', NULL, 1),
(365, 255, 79, '2023-', NULL, 1),
(366, 256, 79, '2023-2025', NULL, 0),
(367, 257, 79, '2023-', NULL, 1),
(368, 258, 79, '2023-', NULL, 1),
(369, 259, 79, '2023-', NULL, 1),
(370, 260, 79, '2023-', NULL, 1),
(371, 261, 79, '2023-', NULL, 1),
(372, 262, 79, '2023-', NULL, 1),
(373, 263, 79, '2023-', NULL, 1),
(374, 264, 79, '2023-', NULL, 1),
(375, 265, 79, '2023-', NULL, 1),
(376, 266, 79, '2023-2025', NULL, 0),
(377, 267, 79, '2023-', NULL, 1),
(378, 268, 79, '2023-2025', NULL, 0),
(379, 269, 79, '2023-', NULL, 1),
(380, 270, 79, '2023-2025', NULL, 0),
(381, 290, 80, '2023-', NULL, 1),
(382, 291, 80, '2023-', NULL, 1),
(383, 292, 80, '2023-', NULL, 1),
(384, 293, 80, '2023-', NULL, 1),
(385, 294, 80, '2023-', NULL, 1),
(386, 295, 80, '2023-', NULL, 1),
(387, 296, 80, '2023-', NULL, 1),
(388, 297, 80, '2023-', NULL, 1),
(389, 298, 80, '2023-', NULL, 1),
(390, 299, 80, '2023-', NULL, 1),
(391, 300, 80, '2023-', NULL, 1),
(392, 301, 80, '2023-', NULL, 1),
(393, 302, 80, '2023-', NULL, 1),
(394, 303, 80, '2023-', NULL, 1),
(395, 304, 80, '2023-2025', NULL, 0),
(396, 305, 80, '2023-', NULL, 1),
(397, 306, 80, '2023-', NULL, 1),
(398, 307, 80, '2023-2025', NULL, 0),
(399, 308, 80, '2023-', NULL, 1),
(400, 309, 55, '2023-', NULL, 1),
(401, 310, 55, '2023-2025', NULL, 0),
(402, 311, 55, '2023-', NULL, 1),
(403, 312, 55, '2023-', NULL, 1),
(404, 313, 55, '2023-', NULL, 1),
(405, 314, 55, '2023-', NULL, 1),
(406, 315, 55, '2023-', NULL, 1),
(407, 316, 55, '2023-', NULL, 1),
(408, 317, 55, '2023-', NULL, 1),
(409, 318, 55, '2023-', NULL, 1),
(410, 319, 55, '2023-', NULL, 1),
(411, 320, 55, '2023-2025', NULL, 0),
(412, 321, 55, '2023-', NULL, 1),
(413, 322, 55, '2023-', NULL, 1),
(414, 323, 55, '2023-', NULL, 1),
(415, 324, 55, '2023-', NULL, 1),
(416, 325, 55, '2023-', NULL, 1),
(417, 326, 55, '2023-2025', NULL, 0),
(418, 327, 55, '2023-', NULL, 1),
(419, 328, 55, '2023-2025', NULL, 0),
(420, 329, 55, '2023-', NULL, 1),
(421, 330, 55, '2023-', NULL, 1),
(422, 331, 55, '2023-', NULL, 1),
(423, 332, 9, '2023-act', NULL, 1),
(424, 333, 9, '2023-act', NULL, 1),
(425, 334, 9, '2023-act', NULL, 1),
(426, 335, 9, '2023-act', NULL, 1),
(427, 336, 9, '2023-act', NULL, 1),
(428, 337, 9, '2023-act', NULL, 1),
(429, 338, 9, '2023-act', NULL, 1),
(430, 339, 9, '2023-act', NULL, 1),
(431, 340, 9, '2023-act', NULL, 1),
(432, 341, 9, '2023-act', NULL, 1),
(433, 342, 9, '2023-act', NULL, 1),
(434, 343, 9, '2023-act', NULL, 1),
(435, 344, 9, '2023-act', NULL, 1),
(436, 345, 9, '2023-act', NULL, 1),
(437, 346, 9, '2023-act', NULL, 1),
(438, 347, 9, '2023-act', NULL, 1),
(439, 348, 9, '2023-act', NULL, 1),
(440, 349, 9, '2023-act', NULL, 1),
(441, 350, 9, '2023-act', NULL, 1),
(442, 351, 9, '2023-act', NULL, 1),
(443, 352, 9, '2023-act', NULL, 1),
(444, 353, 9, '2023-act', NULL, 1),
(445, 354, 81, '2023-', NULL, 1),
(446, 355, 81, '2023-2025', NULL, 0),
(447, 356, 81, '2023-', NULL, 1),
(448, 357, 81, '2023-', NULL, 1),
(449, 358, 81, '2023-', NULL, 1),
(450, 359, 81, '2023-', NULL, 1),
(451, 360, 81, '2023-', NULL, 1),
(452, 361, 81, '2023-', NULL, 1),
(453, 362, 81, '2023-', NULL, 1),
(454, 363, 81, '2023-', NULL, 1),
(455, 364, 81, '2023-', NULL, 1),
(456, 365, 81, '2023-', NULL, 1),
(457, 366, 81, '2023-', NULL, 1),
(458, 367, 81, '2023-', NULL, 1),
(459, 368, 81, '2023-', NULL, 1),
(460, 369, 81, '2023-', NULL, 1),
(461, 370, 81, '2023-', NULL, 1),
(462, 371, 81, '2023-', NULL, 1),
(463, 372, 81, '2023-', NULL, 1),
(464, 373, 81, '2023-', NULL, 1),
(465, 374, 81, '2023-', NULL, 1),
(466, 375, 81, '2023-', NULL, 1),
(467, 376, 81, '2023-', NULL, 1),
(468, 377, 81, '2023-', NULL, 1),
(469, 378, 81, '2023-', NULL, 1),
(470, 379, 81, '2023-', NULL, 1),
(471, 380, 81, '2023-2025', NULL, 0),
(472, 381, 3, '2022-act', NULL, 1),
(473, 381, 22, '2019-2022', NULL, 0),
(474, 381, 82, '2015-2019', NULL, 0),
(475, 381, 20, '2014-2015', NULL, 0),
(476, 381, 31, '2011-2013', NULL, 0),
(477, 382, 23, '2023-2025', NULL, 0),
(478, 383, 21, '2023-2025', NULL, 0),
(479, 383, 5, '2021-2023', NULL, 0),
(480, 383, 18, '2019-2021', NULL, 0),
(481, 383, 14, '2017-2019', NULL, 0),
(482, 383, 25, '2013-2017', NULL, 0),
(483, 384, 18, '2024-act', NULL, 1),
(484, 384, 19, '2023-2024', NULL, 0),
(485, 384, 25, '2017-2023', NULL, 0),
(486, 271, 2, '2023-act', NULL, 1),
(487, 41, 19, '2024-act', NULL, 1),
(488, 45, 83, '2024', NULL, 1),
(489, 44, 83, '2022', NULL, 1),
(490, 67, 83, '2023', NULL, 1),
(491, 386, 1, '2006-2007', NULL, 0),
(492, 386, 1, '2006-2007', NULL, 0),
(493, 386, 26, '2007-2008', NULL, 0),
(494, 386, 1, '2008-2015', NULL, 0),
(495, 386, 76, '2014', NULL, 0),
(496, 386, 18, '2015-2016', NULL, 0),
(497, 386, 1, '2016-2021', NULL, 0),
(498, 386, 21, '2021-2023', NULL, 0),
(499, 386, 85, '2023', NULL, 0),
(500, 386, 90, '2023-act', NULL, 1),
(501, 389, 1, '2019-2024', NULL, 0),
(502, 389, 90, '2024-act', NULL, 1),
(503, 390, 86, '2022-2023', NULL, 0),
(504, 390, 1, '2022-2024', NULL, 0),
(505, 390, 85, '2024-act', NULL, 1),
(506, 272, 1, '2024-act', NULL, 1),
(518, 52, 2, '2020-2024', NULL, 0),
(519, 65, 9, '2018-2020', NULL, 0),
(520, 65, 36, '2020-2021', NULL, 0),
(521, 65, 2, '2021-2022', NULL, 0),
(522, 65, 18, '2022-2023', NULL, 0),
(523, 65, 91, '2022-2023', NULL, 0),
(524, 65, 18, '2023-2024', NULL, 0),
(525, 65, 9, '2023-2024', NULL, 0),
(526, 91, 8, '2014-2021', NULL, 0),
(527, 92, 8, '2019-2023', NULL, 0),
(528, 94, 82, '2016-2019', NULL, 0),
(529, 101, 8, '2011-2021', NULL, 0),
(530, 100, 1, '2006-2018', NULL, 0),
(531, 102, 8, '2013-2021', NULL, 0),
(532, 102, 2, '2021-2024', NULL, 0),
(533, 108, 8, '2014-2021', NULL, 0),
(534, 108, 7, '2021-2023', NULL, 0),
(535, 109, 78, '2017-2021', NULL, 0),
(536, 46, 12, '2008-2011', NULL, 0),
(537, 46, 52, '2011-2012', NULL, 0),
(538, 46, 6, '2012-2020', NULL, 0),
(539, 46, 4, '2020-2021', NULL, 0),
(540, 47, 59, '2019-2022', NULL, 0),
(541, 48, 8, '2012-2015', NULL, 0),
(542, 48, 10, '2015-2022', NULL, 0),
(543, 51, 9, '2022-2023', NULL, 0),
(544, 50, 13, '2019-2021', NULL, 0),
(545, 50, 12, '2021-2024', NULL, 0),
(546, 50, 6, '2016-2019', NULL, 0),
(547, 54, 13, '2019-2022', NULL, 0),
(548, 55, 2, '2021-2023', NULL, 0),
(549, 59, 78, '2016-2021', NULL, 0),
(550, 59, 8, '2021-2023', NULL, 0),
(551, 60, 2, '2019-2022', NULL, 0),
(552, 60, 11, '2022-2024', NULL, 0),
(553, 62, 27, '2017-2023', NULL, 0),
(554, 62, 2, '2011-2016', NULL, 0),
(555, 62, 60, '2016-2017', NULL, 0),
(556, 61, 44, '2010-2017', NULL, 0),
(557, 61, 2, '2017-2018', NULL, 0),
(558, 61, 8, '2018-2020', NULL, 0),
(559, 61, 7, '2020-2022', NULL, 0),
(560, 15, 20, '2024-act', NULL, 1),
(561, 138, 6, '2017-2019', NULL, 0),
(562, 138, 78, '2019-2020', NULL, 0),
(563, 142, 59, '2016-2021', NULL, 0),
(564, 142, 6, '2021-2024', NULL, 0),
(565, 144, 9, '2020-2022', NULL, 0),
(566, 144, 2, '2022-2024', NULL, 0),
(567, 140, 10, '2018-2023', NULL, 0),
(568, 145, 2, '2020-2024', NULL, 0),
(569, 145, 78, '2019-2020', NULL, 0),
(570, 139, 12, '2012-2013', NULL, 0),
(571, 139, 13, '2013-2014', NULL, 0),
(572, 139, 6, '2014-2017', NULL, 0),
(573, 139, 13, '2017-2019', NULL, 0),
(574, 139, 2, '2019-2021', NULL, 0),
(575, 387, 78, '2019-2020', NULL, 0),
(576, 387, 8, '2020-2022', NULL, 0),
(577, 387, 1, '2022-2023', NULL, 0),
(578, 387, 5, '2023-2025', NULL, 0),
(579, 67, 2, '2006-2008', NULL, 0),
(580, 67, 1, '2008-2011', NULL, 0),
(581, 67, 26, '2011-2013', NULL, 0),
(582, 67, 11, '2013-2020', NULL, 0),
(583, 67, 13, '2020-2022', NULL, 0),
(584, 391, 8, '2019-2024', NULL, 0),
(585, 392, 12, '2010-2013', NULL, 0),
(586, 392, 29, '2018', NULL, 0),
(587, 392, 4, '2020-2021', NULL, 0),
(588, 392, 72, '2021-act', NULL, 1),
(589, 393, 2, '2004-2010', NULL, 0),
(590, 393, 6, '2012-2012', NULL, 0),
(591, 393, 2, '2012-2019', NULL, 0),
(592, 394, 10, '2004-2010', NULL, 0),
(593, 394, 26, '2010-2011', NULL, 0),
(594, 394, 10, '2011-2022', NULL, 0),
(595, 395, 59, '2004-2011', NULL, 0),
(596, 395, 1, '2011-2014', NULL, 0),
(597, 395, 1, '2014-2015', NULL, 0),
(598, 395, 6, '2015-2018', NULL, 0),
(599, 395, 2, '2018-2020', NULL, 0),
(600, 396, 2, '2004-2013', NULL, 0),
(601, 396, 1, '2013-2018', NULL, 0),
(602, 396, 2, '2018-2020', NULL, 0),
(603, 397, 12, '2008-2013', NULL, 0),
(604, 397, 52, '2013-2017', NULL, 0),
(605, 397, 81, '2017-2022', NULL, 0),
(606, 397, 12, '2022-2024', NULL, 0),
(607, 397, 45, '2024-act', NULL, 1),
(608, 398, 36, '2005-2007', NULL, 0),
(609, 398, 1, '2007-2018', NULL, 0),
(610, 399, 12, '2005-2007', NULL, 0),
(611, 399, 59, '2007-2010', NULL, 0),
(612, 399, 26, '2010-2013', NULL, 0),
(613, 399, 1, '2013-2015', NULL, 0),
(614, 399, 11, '2015-2016', NULL, 0),
(615, 399, 23, '2016-2018', NULL, 0),
(616, 399, 13, '2018-2020', NULL, 0),
(617, 400, 36, '2008-2011', NULL, 0),
(618, 400, 55, '2011-2013', NULL, 0),
(619, 400, 11, '2014-2020', NULL, 0),
(620, 400, 26, '2020-2021', NULL, 0),
(621, 400, 12, '2021-2022', NULL, 0),
(622, 401, 10, '2016-2022', NULL, 0),
(623, 401, 22, '2022-2024', NULL, 0),
(624, 401, 107, '2024-act', NULL, 1),
(625, 402, 1, '2010-2013', NULL, 0),
(626, 402, 2, '2013-2015', NULL, 0),
(627, 402, 1, '2015-2018', NULL, 0),
(628, 402, 6, '2018-2020', NULL, 0),
(629, 402, 108, '2020-2024', NULL, 0),
(630, 403, 2, '2004-2016', NULL, 0),
(631, 404, 35, '2009-2011', NULL, 0),
(632, 404, 1, '2012-2015', NULL, 0),
(633, 404, 6, '2019-2023', NULL, 0),
(634, 404, 27, '2023-2024', NULL, 0),
(635, 405, 35, '2012-2015', NULL, 0),
(636, 405, 2, '2015-2020', NULL, 0),
(637, 405, 8, '2020-2021', NULL, 0),
(638, 405, 6, '2021-2023', NULL, 0),
(639, 405, 97, '2023-act', NULL, 1),
(640, 406, 2, '2016-2024', NULL, 0),
(641, 406, 19, '2024-act', NULL, 1),
(642, 407, 12, '2016-2024', NULL, 0),
(643, 407, 91, '2024-2025', NULL, 0),
(644, 408, 10, '2016-2023', NULL, 0),
(645, 408, 85, '2023-act', NULL, 1),
(646, 409, 45, '2018-act', NULL, 1),
(647, 410, 11, '2009-2018', NULL, 0),
(648, 410, 2, '2018-2020', NULL, 0),
(649, 410, 7, '2020-2024', NULL, 0),
(650, 410, 86, '2024-act', NULL, 1),
(651, 411, 26, '2016-2019', NULL, 0),
(652, 411, 1, '2019-2024', NULL, 0),
(653, 411, 20, '2024-2025', NULL, 0),
(654, 412, 7, '2020-2022', NULL, 0),
(655, 412, 1, '2022-2024', NULL, 0),
(656, 412, 5, '2024-2025', NULL, 0),
(657, 413, 2, '2015-2019', NULL, 0),
(658, 413, 6, '2019-2021', NULL, 0),
(659, 413, 101, '2021-act', NULL, 1),
(660, 414, 6, '2004-2010', NULL, 0),
(661, 414, 59, '2010-2013', NULL, 0),
(662, 414, 40, '2013', NULL, 0),
(663, 414, 1, '2013-2017', NULL, 0),
(664, 414, 3, '2017-2018', NULL, 0),
(665, 414, 6, '2018-2019', NULL, 0),
(666, 414, 1, '2019-2022', NULL, 0),
(667, 414, 101, '2022-2023', NULL, 0),
(668, 415, 26, '2008-2010', NULL, 0),
(669, 415, 1, '2010-2015', NULL, 0),
(670, 415, 18, '2015-2016', NULL, 0),
(671, 415, 6, '2016-2018', NULL, 0),
(672, 415, 2, '2018-2020', NULL, 0),
(673, 415, 7, '2020-2023', NULL, 0),
(674, 416, 1, '2009-2013', NULL, 0),
(675, 416, 2, '2013-2020', NULL, 0),
(676, 417, 27, '2012-2014', NULL, 0),
(677, 417, 2, '2014-2022', NULL, 0),
(678, 417, 27, '2022-act', NULL, 1),
(679, 418, 1, '2012-2016', NULL, 0),
(680, 418, 6, '2016-2019', NULL, 0),
(681, 418, 1, '2019-2021', NULL, 0),
(682, 418, 2, '2021-2022', NULL, 0),
(683, 418, 96, '2022-2023', NULL, 0),
(684, 418, 45, '2023-act', NULL, 1),
(685, 436, 4, '2024-act', NULL, 1),
(686, 436, 7, '2022-2024', NULL, 0),
(687, 436, 5, '2020-2022', NULL, 0),
(688, 437, 4, '2020-act', NULL, 1),
(689, 437, 10, '2015-2020', NULL, 0),
(690, 437, 91, '2020-2021', NULL, 0),
(691, 451, 5, '2012-act', NULL, 1),
(692, 438, 94, '2010-2011', NULL, 0),
(693, 438, 41, '2012', NULL, 0),
(694, 438, 93, '2012-2014', NULL, 0),
(695, 438, 4, '2014-act', NULL, 1),
(696, 451, 95, '2008-2012', NULL, 0),
(697, 419, 2, '2010-2012', NULL, 0),
(698, 419, 1, '2015-2024', NULL, 0),
(699, 419, 96, '2024-act', NULL, 1),
(700, 426, 2, '2009-2011', NULL, 0),
(701, 426, 52, '2012-2013', NULL, 0),
(702, 426, 6, '2013-2019', NULL, 0),
(703, 426, 2, '2019-2021', NULL, 0),
(704, 426, 7, '2021-2023', NULL, 0),
(705, 426, 97, '2023-act', NULL, 1),
(706, 435, 20, '2014', NULL, 0),
(707, 435, 98, '2011-2012', NULL, 0),
(708, 435, 98, '2015-2016', NULL, 0),
(709, 435, 11, '2016-2017', NULL, 0),
(710, 435, 3, '2017-2021', NULL, 0),
(711, 435, 4, '2022-act', NULL, 1),
(712, 421, 26, '2008-2010', NULL, 0),
(713, 427, 59, '2010-2011', NULL, 0),
(714, 427, 6, '2011-2014', NULL, 0),
(715, 421, 26, '2010-2011', NULL, 0),
(716, 421, 40, '2012-2014', NULL, 0),
(717, 421, 82, '2014-2015', NULL, 0),
(718, 421, 14, '2015-2016', NULL, 0),
(719, 421, 3, '2016-2018', NULL, 0),
(720, 421, 88, '2020-2022', NULL, 0),
(721, 421, 87, '2023-2025', NULL, 0),
(722, 421, 99, '2025-act', NULL, 1),
(723, 421, 103, '2019-2020', NULL, 0),
(724, 421, 44, '2005-2008', NULL, 0),
(725, 427, 11, '2014-2017', NULL, 0),
(726, 427, 8, '2017-2018', NULL, 0),
(727, 427, 2, '2018-2021', NULL, 0),
(728, 427, 7, '2021-2024', NULL, 0),
(729, 427, 103, '2024-act', NULL, 1),
(730, 430, 82, '2011-2018', NULL, 0),
(731, 430, 1, '2019-2023', NULL, 0),
(732, 430, 6, '2023-2024', NULL, 0),
(733, 430, 104, '2024-act', NULL, 1),
(734, 430, 74, '2018-2019', NULL, 0),
(735, 1, 83, '2025-act', NULL, 1),
(736, 310, 2, '2025-act', NULL, 1),
(737, 128, 2, '2025-act', NULL, 1),
(738, 218, 2, '2025-act', NULL, 1),
(739, 382, 7, '2025-act', NULL, 1),
(740, 103, 80, '2025-act', NULL, 1),
(742, 423, 55, '2024-2025', NULL, 0),
(743, 423, 36, '2025-act', NULL, 0),
(744, 423, 1, '2025-act', NULL, 1),
(745, 19, 22, '2025-act', NULL, 1),
(746, 10, 91, '2025-ACT', NULL, 1),
(747, 2, 19, '2025-act', NULL, 1),
(748, 124, 59, '2022-2023', NULL, 0),
(749, 320, 26, '2025-act', NULL, 1),
(750, 320, 1, '2014-2016', NULL, 0),
(751, 320, 26, '2016-2023', NULL, 0),
(752, 37, 26, '2025-act', NULL, 1),
(753, 215, 26, '2025-act', NULL, 1),
(754, 215, 59, '2018-2019', NULL, 0),
(755, 215, 44, '2019-2020', NULL, 0),
(756, 215, 79, '2022-2024', NULL, 0),
(757, 326, 26, '2025-act', NULL, 1),
(758, 326, 36, '2012-2018', NULL, 0),
(759, 326, 44, '2018-2021', NULL, 0),
(760, 266, 26, '2025-act', NULL, 1),
(761, 266, 10, '2018-2024', NULL, 0),
(762, 89, 26, '2025-act', NULL, 1),
(763, 154, 2, '2018-2022', NULL, 0),
(764, 154, 6, '2022-2024', NULL, 0),
(765, 150, 21, '2021-2024', NULL, 0),
(766, 150, 48, '2016-2018', NULL, 0),
(767, 150, 42, '2018-2020', NULL, 0),
(769, 270, 6, '2025-act', NULL, 1),
(770, 270, 59, '2015-2019', NULL, 0),
(771, 411, 6, '2025-act', NULL, 1),
(772, 328, 6, '2025-act', NULL, 1),
(773, 328, 11, '2022-2024', NULL, 0),
(774, 328, 9, '2019-2021', NULL, 0),
(775, 328, 86, '2021-2022', NULL, 0),
(776, 328, 12, '2018-2019', NULL, 0),
(777, 328, 44, '2017-2018', NULL, 0),
(779, 245, 6, '2025-act', NULL, 1),
(780, 355, 12, '2025-act', NULL, 1),
(781, 208, 12, '2025-act', NULL, 1),
(782, 208, 11, '2020-2022', NULL, 0),
(783, 208, 55, '2022-2023', NULL, 0),
(784, 208, 79, '2023-2024', NULL, 0),
(785, 256, 12, '2025-act', NULL, 1),
(786, 76, 12, '2025-act', NULL, 1),
(787, 76, 4, '2020-2024', NULL, 0),
(788, 216, 12, '2025-act', NULL, 1),
(789, 407, 12, '2025-2026', NULL, 0),
(790, 380, 12, '2025-act', NULL, 1),
(791, 380, 25, '2017-2019', NULL, 0),
(792, 307, 12, '2025-act', NULL, 1),
(793, 307, 44, '2021-2022', NULL, 0),
(794, 181, 12, '2024-act', NULL, 1),
(795, 181, 6, '2022-2024', NULL, 0),
(797, 56, 78, '2025-act', NULL, 1),
(798, 304, 78, '2025-act', NULL, 1),
(799, 225, 109, '2025-act', NULL, 1),
(800, 48, 8, '2025-act', NULL, 1),
(801, 74, 8, '2025-act', NULL, 1),
(802, 74, 7, '2020-2023', NULL, 0),
(803, 28, 8, '2025-act', NULL, 1),
(804, 36, 8, '2025-act', NULL, 1),
(805, 120, 8, '2025-act', NULL, 1),
(806, 120, 80, '2020-2022', NULL, 0),
(807, 120, 12, '2022-2024', NULL, 0),
(808, 9, 109, '2025-act', NULL, 1),
(815, 383, 25, '2025-act', NULL, 1),
(816, 453, 23, '2023-act', NULL, 1),
(817, 25, 48, '2025-act', NULL, 1),
(818, 474, 23, '2018-act', NULL, 1),
(819, 475, 23, '2024-act', NULL, 1),
(820, 476, 23, '2024-act', NULL, 1),
(821, 449, 109, '2025-act', NULL, 1),
(822, 30, 92, '2025-act', NULL, 1),
(823, 88, 162, '2025-act', NULL, 1),
(824, 68, 162, '2025-act', NULL, 1),
(825, 472, 109, '2024-act', NULL, 1),
(826, 456, 20, '2023-act', NULL, 1),
(827, 473, 109, '2024-2026', NULL, 1),
(828, 466, 21, '2024-act', NULL, 1),
(829, 466, 18, '2017-2024', NULL, 0),
(830, 466, 14, '2014-2017', NULL, 0),
(831, 466, 34, '2011-2014', NULL, 0),
(832, 478, 25, '2024-act', NULL, 1),
(833, 479, 25, '2023-act', NULL, 1),
(834, 479, 140, '2019-2023', NULL, 0),
(835, 480, 23, '2023-act', NULL, 1),
(836, 480, 146, '2020-2023', NULL, 0),
(837, 481, 22, '2024-act', NULL, 1),
(838, 481, 5, '2019-2024', NULL, 0),
(839, 481, 18, '2015-2019', NULL, 0),
(840, 481, 157, '2013-2015', NULL, 0),
(841, 482, 23, '2021-act', NULL, 1),
(842, 482, 163, '2017-2020', NULL, 0),
(843, 482, 25, '2017-2017', NULL, 0),
(844, 482, 37, '2014-2016', NULL, 0),
(845, 482, 25, '2012-2013', NULL, 0),
(846, 482, 34, '2007-2012', NULL, 0),
(847, 449, 4, '2021-2025', NULL, 0),
(848, 449, 18, '2016-2021', NULL, 0),
(849, 449, 30, '2015-2015', NULL, 0),
(850, 449, 24, '2012-2015', NULL, 0),
(851, 449, 33, '2011-2012', NULL, 0),
(852, 483, 141, '2023-act', NULL, 1),
(853, 483, 24, '2021-2022', NULL, 0),
(854, 483, 23, '2019-2021', NULL, 0),
(855, 483, 149, '2018-2019', NULL, 0),
(856, 483, 23, '2012-2018', NULL, 0),
(857, 483, 141, '2009-2012', NULL, 0),
(858, 461, 20, '2024-act', NULL, 1),
(859, 461, 2, '2022-2024', NULL, 0),
(860, 461, 52, '2020-2022', NULL, 0),
(861, 484, 1, '2022-act', NULL, 1),
(862, 477, 1, '2025-act', NULL, 1),
(863, 477, 21, '2022-2025', NULL, 0),
(864, 477, 6, '2017-2022', NULL, 0),
(865, 485, 1, '2025-act', NULL, 1),
(866, 486, 26, '2025-act', NULL, 1),
(867, 486, 36, '2023-2025', NULL, 0),
(868, 486, 1, '2021-2023', NULL, 0),
(869, 486, 36, '2020-2021', NULL, 0),
(870, 14, 4, '2025-act', NULL, 1),
(871, 494, 1, '2025-act', NULL, 1),
(872, 494, 36, '2025-act', NULL, 0),
(873, 495, 1, '2025-act', NULL, 1),
(874, 495, 36, '2025-act', NULL, 0),
(875, 496, 2, '2023-act', NULL, 1),
(876, 497, 2, '2024-act', NULL, 1),
(877, 498, 2, '2024-act', NULL, 1),
(878, 499, 2, '2025-act', NULL, 1),
(879, 499, 165, '2019-2025', NULL, 0),
(880, 499, 6, '2018-2019', NULL, 0),
(881, 499, 158, '2015-2017', NULL, 0),
(882, 499, 31, '2011-2015', NULL, 0),
(883, 500, 2, '2024-act', NULL, 1),
(884, 412, 81, '2025-2026', NULL, 0),
(885, 412, 2, '2026-act', NULL, 1),
(886, 268, 14, '2025-act', NULL, 1),
(887, 407, 91, '2026-act', NULL, 1),
(888, 455, 164, '2026-act', NULL, 1),
(889, 455, 20, '2021-2026', NULL, 0),
(890, 455, 29, '2014-2021', NULL, 0),
(891, 425, 18, '2024-act', NULL, 1),
(892, 425, 1, '2014-2024', NULL, 0),
(893, 501, 18, '2026-act', NULL, 1),
(894, 501, 48, '2021-2026', NULL, 0),
(895, 502, 5, '2025-act', NULL, 1),
(896, 502, 16, '2023-2025', NULL, 0),
(897, 502, 24, '2018-2023', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trofeos`
--

CREATE TABLE `trofeos` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `tipo` text NOT NULL,
  `icono` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trofeos`
--

INSERT INTO `trofeos` (`id`, `nombre`, `tipo`, `icono`) VALUES
(1, 'UWCL', 'clubes', 'media/1-EU/trofeos/uwcl.png'),
(2, 'WWC', 'selecciones', 'media/2-WORLD/WWC.png'),
(3, 'The Best', 'jugadora', 'media/1-EU/trofeos/thebest.png'),
(4, 'FIFPRO World XI', 'jugadora', 'media/2-WORLD/individuales/FIFPRO_XI.png'),
(5, 'Uefa Euro Cup', 'seleccion', 'media/1-EU/trofeos/euro.png'),
(6, 'Liga F', 'club', 'media/ES/trofeos/ligaF.png'),
(7, 'Copa de SM Reina', 'clubes', 'media/ES/trofeos/copa-reina.png'),
(8, 'Supercopa de España', 'clubes', 'media/ES/trofeos/supercopa.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(20) NOT NULL,
  `Apellidos` varchar(50) DEFAULT NULL,
  `usuario` varchar(20) NOT NULL,
  `email` text DEFAULT NULL,
  `rol` int(11) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `jugadora_favorita` int(11) DEFAULT NULL,
  `es_jugadora` int(11) DEFAULT NULL,
  `token` varchar(36) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL DEFAULT 0,
  `is_staff` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `date_joined` datetime(6) DEFAULT current_timestamp(6),
  `last_login` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `Nombre`, `Apellidos`, `usuario`, `email`, `rol`, `Contrasena`, `jugadora_favorita`, `es_jugadora`, `token`, `is_superuser`, `is_staff`, `is_active`, `date_joined`, `last_login`) VALUES
(3, 'Valencian', 'Sports', 'admin', NULL, 1, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, NULL, '', 0, 0, 1, '2026-02-23 20:45:21.662380', NULL),
(5, 'Admin', 'merce', 'admin1', NULL, 1, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, NULL, '', 0, 0, 1, '2026-02-23 20:45:21.662380', NULL),
(6, 'pruebas', 'unos', 'Prueba89', NULL, 2, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, NULL, '', 0, 0, 1, '2026-02-23 20:45:21.662380', NULL),
(8, 'Rubén', 'García', 'rvby22', NULL, 1, 'pbkdf2_sha256$1000000$wivGSfoO5XHsZiMicxDgyR$gPRZL05w38srLubDY7UjKITOSflN88h0fplvWskdxbc=', 1, NULL, '', 1, 1, 1, '2026-02-23 20:45:21.662380', '2026-02-26 09:02:20.629480'),
(10, '', '', 'ruby22', NULL, 1, 'pbkdf2_sha256$1000000$lzprDp90o7zhxLGaAGqvFC$HPkswl6ibqisnpjXIP+IHKS585EaZrPDjP0w1wrX+NE=', NULL, NULL, '', 0, 0, 1, '2026-02-23 20:45:21.662380', NULL),
(11, 'Emma', 'Holmgren', 'emmaholmgrenn', NULL, 1, 'pbkdf2_sha256$1000000$4bXsvppvC8MJrUlItg0OqY$tbGetHfkyNrUulxIsoFIRqT6i6ymEVRwwA9T8th6TpQ=', 25, 25, '', 0, 0, 1, '2026-02-23 20:45:21.662380', NULL),
(12, 'Yaiza', 'García Quiralte', 'yaizaagarciaa27', '', 2, 'pbkdf2_sha256$1000000$u1TPGZ70obUFCWaKJWHZkY$B1B6QQI+gtmYlKdnolbNrhVJwZL1/hICYMVBWUmpGpU=', 1, NULL, '0', 0, 0, 1, '2026-02-25 17:25:02.263152', '2026-02-25 19:10:29.038558'),
(13, 'Merce', 'Iranzo', '2000merce', '', 1, 'pbkdf2_sha256$1000000$2MjiXKhJATmIszETwSHqk6$oyNQY0jvEoWaYewUr/gSman8eLAv/0vqNZKsrXkQVyI=', 67, NULL, '0', 0, 1, 1, '2026-02-26 09:06:50.532761', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indices de la tabla `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indices de la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_usuarios_id` (`user_id`);

--
-- Indices de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indices de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indices de la tabla `equipo-trofeo`
--
ALTER TABLE `equipo-trofeo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipo` (`equipo`),
  ADD KEY `trofeo` (`trofeo`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id_equipo`),
  ADD KEY `liga` (`liga`);

--
-- Indices de la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indices de la tabla `jugadora-pais`
--
ALTER TABLE `jugadora-pais`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jugadora` (`jugadora`),
  ADD KEY `pais` (`pais`);

--
-- Indices de la tabla `jugadora-trofeo`
--
ALTER TABLE `jugadora-trofeo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jugadora` (`jugadora`),
  ADD KEY `trofeo` (`trofeo`);

--
-- Indices de la tabla `jugadoras`
--
ALTER TABLE `jugadoras`
  ADD PRIMARY KEY (`id_jugadora`),
  ADD KEY `Posicion` (`Posicion`);

--
-- Indices de la tabla `ligas`
--
ALTER TABLE `ligas`
  ADD PRIMARY KEY (`id_liga`),
  ADD KEY `pais_2` (`pais`),
  ADD KEY `pais` (`pais`) USING BTREE;

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id_pais`);

--
-- Indices de la tabla `pistas`
--
ALTER TABLE `pistas`
  ADD UNIQUE KEY `id_juego` (`id_juego`) USING BTREE;

--
-- Indices de la tabla `posiciones`
--
ALTER TABLE `posiciones`
  ADD PRIMARY KEY (`idPosicion`),
  ADD KEY `idPosicionPadre` (`idPosicionPadre`);

--
-- Indices de la tabla `rachas`
--
ALTER TABLE `rachas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario` (`usuario`),
  ADD KEY `juego` (`juego`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `trayectoria`
--
ALTER TABLE `trayectoria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jugadora` (`jugadora`),
  ADD KEY `equipo` (`equipo`);

--
-- Indices de la tabla `trofeos`
--
ALTER TABLE `trofeos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Usuario` (`usuario`),
  ADD UNIQUE KEY `es_jugadora_2` (`es_jugadora`),
  ADD KEY `rol` (`rol`),
  ADD KEY `jugadora_favorita` (`jugadora_favorita`) USING BTREE,
  ADD KEY `es_jugadora` (`es_jugadora`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT de la tabla `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `equipo-trofeo`
--
ALTER TABLE `equipo-trofeo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- AUTO_INCREMENT de la tabla `juegos`
--
ALTER TABLE `juegos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `jugadora-pais`
--
ALTER TABLE `jugadora-pais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=551;

--
-- AUTO_INCREMENT de la tabla `jugadora-trofeo`
--
ALTER TABLE `jugadora-trofeo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `jugadoras`
--
ALTER TABLE `jugadoras`
  MODIFY `id_jugadora` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=503;

--
-- AUTO_INCREMENT de la tabla `ligas`
--
ALTER TABLE `ligas`
  MODIFY `id_liga` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises`
  MODIFY `id_pais` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `posiciones`
--
ALTER TABLE `posiciones`
  MODIFY `idPosicion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `rachas`
--
ALTER TABLE `rachas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `trayectoria`
--
ALTER TABLE `trayectoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=898;

--
-- AUTO_INCREMENT de la tabla `trofeos`
--
ALTER TABLE `trofeos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Filtros para la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Filtros para la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_usuarios_id` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `equipo-trofeo`
--
ALTER TABLE `equipo-trofeo`
  ADD CONSTRAINT `equipo-trofeo_ibfk_1` FOREIGN KEY (`trofeo`) REFERENCES `trofeos` (`id`),
  ADD CONSTRAINT `equipo-trofeo_ibfk_2` FOREIGN KEY (`equipo`) REFERENCES `equipos` (`id_equipo`);

--
-- Filtros para la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `equipos_ibfk_1` FOREIGN KEY (`liga`) REFERENCES `ligas` (`id_liga`);

--
-- Filtros para la tabla `jugadora-pais`
--
ALTER TABLE `jugadora-pais`
  ADD CONSTRAINT `jugadora-pais_ibfk_1` FOREIGN KEY (`pais`) REFERENCES `paises` (`id_pais`),
  ADD CONSTRAINT `jugadora-pais_ibfk_2` FOREIGN KEY (`jugadora`) REFERENCES `jugadoras` (`id_jugadora`);

--
-- Filtros para la tabla `jugadora-trofeo`
--
ALTER TABLE `jugadora-trofeo`
  ADD CONSTRAINT `jugadora-trofeo_ibfk_1` FOREIGN KEY (`jugadora`) REFERENCES `jugadoras` (`id_jugadora`),
  ADD CONSTRAINT `jugadora-trofeo_ibfk_2` FOREIGN KEY (`trofeo`) REFERENCES `trofeos` (`id`);

--
-- Filtros para la tabla `jugadoras`
--
ALTER TABLE `jugadoras`
  ADD CONSTRAINT `jugadoras_ibfk_2` FOREIGN KEY (`Posicion`) REFERENCES `posiciones` (`idPosicion`);

--
-- Filtros para la tabla `ligas`
--
ALTER TABLE `ligas`
  ADD CONSTRAINT `ligas_ibfk_1` FOREIGN KEY (`pais`) REFERENCES `paises` (`id_pais`);

--
-- Filtros para la tabla `posiciones`
--
ALTER TABLE `posiciones`
  ADD CONSTRAINT `posiciones_ibfk_1` FOREIGN KEY (`idPosicionPadre`) REFERENCES `posiciones` (`idPosicion`);

--
-- Filtros para la tabla `rachas`
--
ALTER TABLE `rachas`
  ADD CONSTRAINT `rachas_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `rachas_ibfk_2` FOREIGN KEY (`juego`) REFERENCES `pistas` (`id_juego`);

--
-- Filtros para la tabla `trayectoria`
--
ALTER TABLE `trayectoria`
  ADD CONSTRAINT `trayectoria_ibfk_1` FOREIGN KEY (`jugadora`) REFERENCES `jugadoras` (`id_jugadora`),
  ADD CONSTRAINT `trayectoria_ibfk_2` FOREIGN KEY (`equipo`) REFERENCES `equipos` (`id_equipo`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`jugadora_favorita`) REFERENCES `jugadoras` (`id_jugadora`),
  ADD CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`es_jugadora`) REFERENCES `jugadoras` (`id_jugadora`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
