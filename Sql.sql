-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema fullcalendar
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fullcalendar
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fullcalendar` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `fullcalendar` ;

-- -----------------------------------------------------
-- Table `fullcalendar`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fullcalendar`.`events` (
  `id` INT NOT NULL,
  `title` VARCHAR(400) NOT NULL,
  `color` VARCHAR(12) NULL,
  `start` DATETIME NOT NULL,
  `end` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)
) ENGINE = InnoDB;

/* Inserindo dados na tabela*/
INSERT INTO `events` (`title`, `color`, `start`, `end`)
VALUES ('Evento 1', '#00ff00', '2024-09-30 14:00:00', '2024-09-30 20:00:00');

INSERT INTO `events` (`id`, `title`, `color`, `start`, `end`)
VALUES (2, 'Evento 2', '#888888', '2024-09-10 04:00:00', '2024-09-11 08:00:00');


select * from  events;

DELETE TABLE fullcalendar;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    color VARCHAR(50) NOT NULL,
    start DATETIME NOT NULL,
    end DATETIME NOT NULL
);


ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);
  
  ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;