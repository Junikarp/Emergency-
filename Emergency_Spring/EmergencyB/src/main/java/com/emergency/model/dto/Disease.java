package com.emergency.model.dto;

public class Disease {
	private String user_id;
	private int diseaseId;
	private String category;
	private String value;

	public int getDiseaseId() {
		return diseaseId;
	}
	
	public void setDiseaseId(int diseaseId) {
		this.diseaseId = diseaseId;
	}
	
	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
