package com.emergency.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class User {
	private String id;
	private String name;
	private String password;
	private int height;
	private int weight;
	private String bloodtypeABO;
	private String bloodtypeRh;
	private String guardianTel;
}
