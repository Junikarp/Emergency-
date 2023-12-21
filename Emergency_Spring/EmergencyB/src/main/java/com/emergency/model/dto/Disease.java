package com.emergency.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Disease {
	private String user_id;
	private int diseaseId;
	private String category;
	private String value;
}
