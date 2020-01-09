CREATE TABLE `sinf` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 
-- Dumping data for table `sinf`
-- 

INSERT INTO `sinf` VALUES ('1','Dasturlash');
INSERT INTO `sinf` VALUES ('2','Aloqa');
INSERT INTO `sinf` VALUES ('3','123');

-- --------------------------------------------------------
-- 
-- Table structure for table `users`
-- 

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sinf_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 
-- Dumping data for table `users`
-- 

INSERT INTO `users` VALUES ('3','Sanjar','Majidov','3','2019-12-21 23:52:34');
INSERT INTO `users` VALUES ('7','First name','Last Name','3','2019-12-29 15:37:16');
INSERT INTO `users` VALUES ('13','Bahriddin','Muminov','1','2019-12-29 15:52:00');
