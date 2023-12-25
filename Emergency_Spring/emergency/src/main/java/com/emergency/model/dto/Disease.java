package com.emergency.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Disease {
	private String userId;
	private int diseaseId;
	private String category;
	private String value;
	private String diseaseDate;
}
