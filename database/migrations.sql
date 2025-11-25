/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `pack_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fk_orderitems_orders` (`order_id`),
  KEY `fk_orderitems_packs` (`pack_id`),
  CONSTRAINT `fk_orderitems_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `fk_orderitems_packs` FOREIGN KEY (`pack_id`) REFERENCES `packs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `by_user` int(11) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orders_users` (`by_user`),
  CONSTRAINT `fk_orders_users` FOREIGN KEY (`by_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `packs`;
CREATE TABLE `packs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `order_items` (`id`, `order_id`, `pack_id`, `quantity`) VALUES
(1, 1, 1, 1),
(2, 2, 9, 2),
(3, 3, 1, 2),
(4, 4, 5, 1),
(5, 5, 3, 1),
(6, 6, 7, 1),
(7, 7, 7, 2),
(8, 8, 4, 2),
(9, 9, 3, 2),
(10, 10, 7, 2),
(11, 1, 3, 2),
(12, 3, 1, 1),
(13, 11, 12, 1),
(14, 12, 13, 1);
INSERT INTO `orders` (`id`, `by_user`, `date`) VALUES
(1, 1, '2025-11-18'),
(2, 1, '2025-11-25'),
(3, 8, '2025-03-03'),
(4, 7, '0000-00-00'),
(5, 6, '2025-04-06'),
(6, 5, '2025-07-04'),
(7, 4, '2025-05-05'),
(8, 3, '2025-09-09'),
(9, 2, '2025-04-23'),
(10, 1, '2025-02-13'),
(11, 10, '2025-01-30'),
(12, 6, '2025-08-01');
INSERT INTO `packs` (`id`, `name`, `destination`, `price`) VALUES
(1, 'Weekend in Budapest', 'Hunghery', '350.00'),
(2, 'Andalusia tour by train', 'Spain', '400.00'),
(3, 'Long stay in New York', 'USA', '1060.00'),
(4, 'Amazing Iguazu trip', 'Brasil', '1300.00'),
(5, 'Discovering the ancient Maya culture', 'Mexico', '1700.00'),
(6, 'Round trip from Tokyo to Hiroshima', 'Japan', '850.00'),
(7, 'China Great Wall and Avatar\'s mountains', 'China', '1200.00'),
(8, 'Idyllic Bali nature - surf trip', 'Indonesia', '1050.00'),
(9, 'Africa Safari', 'Kenya', '1200.00'),
(10, 'Thailand island-hopping adventure', 'Thailand', '1200.00'),
(11, 'Aurora Borealis and Arctic experience', 'Norway', '620.00'),
(12, 'Costa Rica surf trip adveture', 'Costa Rica', '1400.00'),
(13, 'Enchanting tour of Marrakech', 'Morocco', '450.00'),
(31, 'Special Costa Amalfitana', 'Italia', '620.00'),
(32, 'Bologna', 'Italia', '200.00');
INSERT INTO `users` (`id`, `name`, `first_name`, `email`) VALUES
(1, 'Mario', 'Rossi', 'mariorossi@gamail.com'),
(2, 'Luca', 'Gialli', 'lucagialli@gamail.com'),
(3, 'Pedro', 'Bianchi', 'pedrobianchi@gamail.com'),
(4, 'Giacomo', 'Neri', 'giacomoneri@gamail.com'),
(5, 'Diana', 'Bianchi', 'dianabianchi@gamail.com'),
(6, 'Beatrice', 'Arancioni', 'beatricearancioni@gamail.com'),
(7, 'Luz', 'Verdi', 'luzverdi@gamail.com'),
(8, 'Pedro', 'Pe', 'pedrope@gamail.com'),
(9, 'Mihai', 'Kawa', 'mihaikawa@gamail.com'),
(10, 'Adriano', 'Furlan', 'adrifurlan@gamail.com'),
(11, 'Lucia', 'Lyra', 'lucialyra@gamail.com'),
(12, 'Raffa', 'Carrà', 'raffacarrà@gamail.com'),
(13, 'Alfonso', 'Signorini', 'alfonsosignorini@gamail.com'),
(14, 'Roberto', 'Sal', 'robertosal@gamail.com'),
(15, 'Dario', 'Dari', 'dariodari@gamail.com');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;