jqueryChat
==========

an jquery chat client


before setup
----------
this plugin is base on bootstrap and less,so i recommend that if your app is not base on bootstrap,you need to edit
the css yourself

how to used
----------
used with bootstrap and less
------
1. the code just like this:

```javascript
  <head>
    <link href="http://localhost:8080/neuron/assets/0.0.1-SNAPSHOT/ctx/assets/plugins/chat/jquery.chat.less" type="text/css" rel="stylesheet/less" />
		<script type="text/javascript" src="http://localhost:8080/neuron/assets/0.0.1-SNAPSHOT/ctx/assets/js/jquery-1.7.2.js"></script>
		<script type="text/javascript" src="http://localhost:8080/neuron/assets/0.0.1-SNAPSHOT/ctx/assets/js/less-1.3.0.min.js"></script>
		<script type="text/javascript" src="http://localhost:8080/neuron/assets/0.0.1-SNAPSHOT/ctx/assets/plugins/chat/jquery.chat.js"></script>
</head>

<script>
  	jQuery(document).ready(function(){
			jQuery("#myChat").chat();
		});
</script>
<body>
	<div id="myChat" class="chat">
	</div>
</body>
```



2. you can change the width、height、inputHeight etc. by jquery.chat.less.
3. the chat options that can config as follows:

   *  backgroundImg:the chat panel background img
   * defaultIcon:if user do not has icon the default icon will used
   * maxWordCount:the number of word can enter in the input area
   * showDefaultMessage:you can disable this in used.
   * currentUserIcon:current user icon
   * messageAjaxUrl:the server url to accept the message
   * ajaxStaticParam:the server param just like the currentUser and the room id.
   * onSuccess:the callback method when send message
   * onFailed:...  

used without bootstrap and less
------
  you can have a look at the example in the source.