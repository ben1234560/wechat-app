-- MySQL dump 10.13  Distrib 5.7.25, for Win64 (x86_64)
--
-- Host: localhost    Database: company_info
-- ------------------------------------------------------
-- Server version	5.7.25-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alembic_version`
--

DROP TABLE IF EXISTS `alembic_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alembic_version`
--

LOCK TABLES `alembic_version` WRITE;
/*!40000 ALTER TABLE `alembic_version` DISABLE KEYS */;
INSERT INTO `alembic_version` VALUES ('29d80dbd505e');
/*!40000 ALTER TABLE `alembic_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `sort` int(11) DEFAULT NULL COMMENT '排xu',
  `is_deleted` tinyint(1) DEFAULT NULL COMMENT '逻辑删除',
  `is_show` tinyint(1) DEFAULT NULL COMMENT '是否显示',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(64) DEFAULT NULL COMMENT '部门名称',
  `describe` varchar(512) NOT NULL COMMENT '部门描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('2019-06-14 23:05:03','2019-06-14 23:05:03',0,0,1,2,'销售部','公司产品销售'),('2019-06-14 23:07:52','2019-06-14 23:07:52',0,0,1,3,'总办','董事长及老板等'),('2019-06-14 23:08:02','2019-06-14 23:08:02',0,0,1,4,'财务部','---'),('2019-06-14 23:08:23','2019-06-14 23:08:23',0,0,1,5,'运营部','总公司运营'),('2019-06-14 23:08:44','2019-06-14 23:08:44',0,0,1,6,'开发部','总公司开发');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_user` (
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `sort` int(11) DEFAULT NULL COMMENT '排xu',
  `is_deleted` tinyint(1) DEFAULT NULL COMMENT '逻辑删除',
  `is_show` tinyint(1) DEFAULT NULL COMMENT '是否显示',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username` varchar(64) DEFAULT NULL COMMENT '用户',
  `password` varchar(64) DEFAULT NULL COMMENT '密码',
  `mobile` varchar(64) DEFAULT NULL COMMENT '订单号',
  `department_id` int(11) DEFAULT NULL COMMENT '部门ID',
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  KEY `ix_tb_user_mobile` (`mobile`),
  KEY `ix_tb_user_password` (`password`),
  KEY `ix_tb_user_username` (`username`),
  CONSTRAINT `tb_user_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES ('2019-06-14 23:14:30','2019-06-14 23:14:30',0,0,1,1,'root','123','12312312311',6),('2019-06-14 23:17:26','2019-06-14 23:17:26',0,0,1,2,'老板','888','112',3),('2019-06-14 23:17:41','2019-06-14 23:17:41',0,0,1,3,'test1','123','11212',6),('2019-06-14 23:17:56','2019-06-14 23:17:56',0,0,1,4,'test2','123','213114',6),('2019-06-15 13:34:09','2019-06-17 16:11:06',0,0,1,5,'123','123','12345678911',4),('2019-06-15 13:58:06','2019-06-15 13:58:06',0,0,1,6,'1234','123','12312312311',6),('2019-06-15 13:59:56','2019-06-15 13:59:56',0,0,1,7,'1233','123','12312312311',6),('2019-06-15 14:14:07','2019-06-15 15:29:03',0,0,1,8,'12334','123','12312312311',5),('2019-06-17 14:14:53','2019-06-17 14:14:53',0,0,1,9,'333','1a100d2c0dab19c4430e7d73762b3423','33333333311',4),('2019-06-17 14:35:49','2019-06-17 14:35:49',0,0,1,10,'444','73882ab1fa529d7273da0db6b49cc4f3','44444444411',3),('2019-06-17 14:38:39','2019-06-17 14:38:39',0,0,1,11,'555','5b1b68a9abf4d2cd155c81a9225fd158','12314121231',4),('2019-06-17 14:40:07','2019-06-17 14:40:07',0,0,1,12,'5556','4e64acb6623df9519bc350cec83a03d1','12312312311',4),('2019-06-17 14:43:33','2019-06-17 14:43:33',0,0,1,13,'777','f63f4fbc9f8c85d409f2f59f2b9e12d5','12312312311',4),('2019-06-17 14:45:47','2019-06-17 14:45:47',0,0,1,14,'455','839dbf4defa366888302bce47d6a4c19','11111111111',4),('2019-06-17 14:47:32','2019-06-17 14:47:32',0,0,1,15,'888','21218cca77804d2ba1922c33e0151105','12312312311',4),('2019-06-17 14:48:29','2019-06-17 14:48:29',0,0,1,16,'yyy','94e7d712742adbbb7a73a1d52a7cc1a9','22222222211',5);
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-17 19:11:01
