package com.osi.managedbean;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.event.ActionEvent;

@ManagedBean(name="helloWorld",eager=true)
public class HelloWorld {

	public HelloWorld(){
		System.out.println("Hello World Constructor");
	}
	
	@ManagedProperty(value = "#{message}")
	private Message messageBean;
	
	// if you can use ManagedProperty annotation, needs include setter and getter methods for that bean
	public Message getMessageBean() {
		return messageBean;
	}

	public void setMessageBean(Message messageBean) {
		this.messageBean = messageBean;
	}

	
	public String buttonId;
	public void getAnEvent(ActionEvent event){
		buttonId=event.getComponent().getClientId();
		System.out.println("buttonId "+buttonId);
	}
	public String getMessage(){
		
		return "This is first Hello World Example Message";
	}
	
	public String showManagedPropertyMessage(){
		
		
		return messageBean.getMessage();
	}
	
	public String autoNavigation(){
		return "page1";
	}
}
