-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema second_chance
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema second_chance
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `second_chance` DEFAULT CHARACTER SET utf8 ;
USE `second_chance` ;

-- -----------------------------------------------------
-- Table `second_chance`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_chance`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `second_chance`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_chance`.`admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(90) NOT NULL,
  `lastname` VARCHAR(90) NOT NULL,
  `email` VARCHAR(90) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id`, `role_id`),
  INDEX `fk_admin_role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_admin_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `second_chance`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `second_chance`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_chance`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `second_chance`.`state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_chance`.`state` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `second_chance`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_chance`.`item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  `ram` INT NOT NULL,
  `memory` INT NOT NULL,
  `screen` INT NOT NULL,
  `network` VARCHAR(45) NULL,
  `stockage` INT NOT NULL,
  `camera` VARCHAR(45) NOT NULL,
  `battery` INT NOT NULL,
  `charger` TINYINT NOT NULL,
  `disponibility` TINYINT NOT NULL,
  `category_id` INT NOT NULL,
  `state_id` INT NOT NULL,
  PRIMARY KEY (`id`, `category_id`, `state_id`),
  INDEX `fk_item_category_idx` (`category_id` ASC) VISIBLE,
  INDEX `fk_item_state1_idx` (`state_id` ASC) VISIBLE,
  CONSTRAINT `fk_item_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `second_chance`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_item_state1`
    FOREIGN KEY (`state_id`)
    REFERENCES `second_chance`.`state` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `second_chance`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_chance`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(90) NOT NULL,
  `lastname` VARCHAR(90) NOT NULL,
  `zipcode` INT NOT NULL,
  `username` VARCHAR(90) NOT NULL,
  `email` VARCHAR(90) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id`, `role_id`),
  INDEX `fk_user_role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `second_chance`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `second_chance` ;

INSERT INTO `role` (name) VALUES ('admin'), ('user');
INSERT INTO `state` (name) VALUES ('DEEE'), ('réparable'), ('bloqué'), ('reconditionnable'), ('reconditionné');
INSERT INTO `category` (name) VALUES ('smartphone'), ('tablette'), ('ordinateur'), ('accessoire');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
