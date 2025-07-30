<?xml version="1.0" encoding="UTF-8"?>
<template>
	
	<header>
	</header>
	
	<entity id="main"><![CDATA[
	{
		"success": [%IF error; 'false'; ELSE; 'true'; END%],
		"logged": "[%notlogged; logout; logged; link%]s"
	}
]]></entity>
	
	
</template>