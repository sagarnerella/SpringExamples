package com.osi.managedbean;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;


@ManagedBean(name="message",eager=true)
@RequestScoped
public class Message {
	public Message(){
		System.out.println("Message constructor");
	}
	private String message;

	public String getMessage() {
		message="@ManagedPropery can be used to inject one bean into another bean ";
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	

}
