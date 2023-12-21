package com.emergency.model.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class User {
	private String id;
	private String name;
	private String password;
	private int height;
	private int weight;
	private String bloodtype;
	private String guardianTel;
	private List<Disease> diseaseList;
}
