/*
 * Chat - jQuery plugin 1.0.0
 * a simple client plugin to display the chat or discuss data and
 * ajax request to submit data.
 */

 ;(function($){
	var options = {};	
	var chatElement;
	var currentContent;
	var wordCountTip1 = "您还可以输入<b class='wordCount'>";
	var wordCountTip2 = "您已经超出<b class='wordCount red'>";
	var wordCountTip3 = "</b>字";
 
	//private methods
	_init = function(target){		
		
		if(target.find(".chat-panel").length > 0){
			return;
		}
		chatElement = target;
		
		target.addClass("chat");
		
		//1.init background img
		target.appendChild(_createDom1("img",{"src":options.backgroundImg},["bg-img"]));
		
		var chatPanel = target.appendChild(_createDom2("div",["chat-panel"]));
		
		//2.init chat info panel
		var msgList = chatPanel.appendChild(_createDom2("div",["chat-info"]))
							.appendChild(_createDom2("ul",["msg-list"]));
							
		//3.init chat input panel
		chatPanel.appendChild(_createDom2("div",["chat-input"]))
				 .append(_createDom2("textarea",["input","messageContent"]))
				 .appendChild(_createDom2("div",["chat-send","clearfix"]))
				 .append(_createDom("button","发送",{},["btn","btn-primary","sendBtn"]))
				 .appendChild(_createDom("span","您还可以输入<b class='wordCount'>" + options.maxWordCount + "</b>字",{},["input-info"]));		   
		//4.create default message
		if(options.showDefulatMessage){
			msgList.append(_createMsgDom({
				position:"right",
				content:"the default message content,you can init your message info by $('#myChat').addMessage"
			}));		
		}
		
		
		//5.init the page listener
		EventHandler.initPageListener();
	};
	
	_onMsgSendSuccess = function(){
		alert("send success");
	};
	_onMsgSendFailed = function(){
		alert("send message failed,please config the messageAjaxUrl in options");
	}	
	
	//Page event listener
	EventHandler = (function(){
		//1.send message btn listener
		var sendMessage = function(){
			var content = chatElement.find(".messageContent").val();
			chatElement.find(".messageContent").val("");
			
			var message = {
				position:"left",
				icon:options.currentUserIcon,
				content:content
			}
			$.chat.addMessage(chatElement,message);
			var scrollSize = chatElement.find(".msg-list").height();
			chatElement.find(".chat-info").animate({scrollTop:scrollSize},1000);
			sendMessageRemote(message);
		};
		
		var sendMessageRemote = function(message){
			$.ajax({
				url:options.messageAjaxUrl,
				type:"POST",
				data:"content="+ message.content + "&" + options.ajaxStaticParam,
				success:function(data){
					options.onSuccess();
				},
				error:function(e){
					options.onFailed();
				}				
			});
		}
		
		//2.word count listener
		var wordCountUpdate = function(){
			var wordCount = chatElement.find(".messageContent").val().length;
			var remain = options.maxWordCount - wordCount;
			if(remain >= 0){
				chatElement.find(".wordCount").parent().html(wordCountTip1 + remain + wordCountTip3);
				chatElement.find(".sendBtn").attr("disabled",false);
			}else{
				chatElement.find(".wordCount").parent().html(wordCountTip2 + Number(0-remain) + wordCountTip3);
				chatElement.find(".sendBtn").attr("disabled",true);
			}
		}
		
		result = {
			initPageListener:function(){
				chatElement.find(".sendBtn").off("click").on("click",sendMessage);
				chatElement.find(".messageContent").off("keyup").on("keyup",wordCountUpdate);
			}
		}
		return result;
	})();
	
	_createMsgDom = function(msgData){
		var msgItem = _createDom2("li",["msg-item"]);
		var position = msgData.position == "right"?"right":"left";
		
		msgItem.append(_createDom1("img",{"src":msgData.icon?msgData.icon:options.defaultIcon},[position]))
			.appendChild(_createDom2("div",["msg-info",position]))
			.append(_createDom("div",msgData.content,{},["msg"]))
			.append(_createDom2("div",[position=="right"?"triIcon-right":"triIcon-left"]))
			.append(_createDom2("div",[position=="right"?"triIconOuter-right":"triIconOuter-left"]));		
			
		return msgItem;
	};
	
	_createDom2 = function(type,styles){
		return _createDom1(type,{},styles);
	};
	_createDom1 = function(type,attr,styles){
		return _createDom(type,"",attr,styles);
	};
	
	_createDom = function(type,innerHtml,attr,styles){
		var element = $(_wrapper(type,innerHtml));
		$.each(attr,function(key,value){
			element.attr(key,value);
		});
		$.each(styles,function(k,v){		
			element.addClass(v);
		});
		
		return element;
	};
	_wrapper = function(type,innerHtml){
		return "<" + type + ">" + innerHtml + "</" + type + ">";		
	};
	
	//chat entrance method
	$.fn.chat = function(userOptions) {
		if(this.html().length){
			return this;
		}
		
		if(userOptions){
			options = $.extend({},$.fn.chat.defaults,userOptions);
		}else{
			options = $.fn.chat.defaults;
		}
		
		_init(this);
	};
	
	
	$.fn.addMessage = function(message){
		$.chat.addMessage(this,message);
	};
	
	$.chat = function(){};
	$.chat.addMessage = function(object,message){
		object.find(".msg-list").append(_createMsgDom(message));
	};
	
	//change the return value to the append element
	$.fn.appendChild = function(element){	
		if(element instanceof jQuery){
			this.append(element);
			return element;
		}else{
			var jQueryElement = $(element);
			this.append(jQueryElement);
			return jQueryElement
		}
	};
	
	//default options:the css style is configuration in the jquery.chat.less
	$.fn.chat.defaults = {
		backgroundImg:"http://localhost:8080/neuron/assets/0.0.1-SNAPSHOT/ctx/assets/plugins/chat/bg.jpg",
		defaultIcon:"http://localhost:8080/neuron/assets/0.0.1-SNAPSHOT/ctx/assets/plugins/chat/icon-default.jpg",
		maxWordCount:120,
		showDefulatMessage:true,
		currentUserIcon:"http://localhost:8080/neuron/assets/0.0.1-SNAPSHOT/ctx/assets/plugins/chat/icon-default.jpg",
		messageAjaxUrl:"http://localhost:8080/neuron/messageHander",
		ajaxStaticParam:"user=admin&room=fighting",
		onSuccess:_onMsgSendSuccess,
		onFailed:_onMsgSendFailed
	}
	
 })(jQuery);
$(document).ready(function(){
	jQuery(".chat").chat();
});