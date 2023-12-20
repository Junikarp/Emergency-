package com.emergency.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emergency.model.dao.UserDao;
import com.emergency.model.dto.User;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserDao userDao;
	
	@Override
	public int createUser(User user) {
		return userDao.createUser(user);
	}

	@Override
	public int updateUser(User user) {
		return userDao.updateUser(user);
	}

	@Override
	public User selectUser(String id) {
		return userDao.selectUser(id);
	}

	@Override
	public int deleteUser(String id) {
		return userDao.deleteUser(id);
	}
	
}
