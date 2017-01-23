package com.osi.managedbean;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;

@ManagedBean(name="conditionalBean",eager=true)
@RequestScoped
public class ConditionBean {
public ConditionBean(){
	System.out.println("ConditionBean constructor ");
}
	@ManagedProperty(value="#{param.pageId}")
	private String pageId;
	public String getPageId() {
		return pageId;
	}
	public void setPageId(String pageId) {
		this.pageId = pageId;
	}
	public String conditional(){
		String pageName="";
		if(pageId == null){
			pageName= "home";
	      }
		if(pageId.equals("1"))
			pageName="page1";
		if(pageId.equals("2"))
			pageName="page2";
		return pageName;
	}
	
}
