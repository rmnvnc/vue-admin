<?xml version="1.0" encoding="UTF-8"?>
<template>
	
	<header>
	</header>
	
	<entity id="main"><![CDATA[
	[%IF error%]
	{
		"error": {
			"code": 500,
			"message": "[% error | html %]"
		}
	}
	[% ELSE%]
	{
		"data": {		
			"id": "[%user.ID_user%]",
			"login": "[%user.login%]",
			"email": "[%user.email%]",
			"token": "[%user.ID_user _ '.' _ user.ID_session%]"
		}
	}
	[% END %]
]]></entity>
	
	
</template>