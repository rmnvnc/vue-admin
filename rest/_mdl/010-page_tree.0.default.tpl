<?xml version="1.0" encoding="UTF-8"?>
<template>
	
	<header>
	</header>
	
	<entity id="main"><![CDATA[[% USE JSON %]
{
	"success": "true",
	"data": 
		[%FOREACH item IN items%]
			[
				[%FOREACH item IN item.items%]
					[%PROCESS node%][%',' IF !loop.last%]
				[%END%]
			]
		[%END%]
}


	]]></entity>


	<entity id="node"><![CDATA[
		{
			"ID": [%item.ID%],
			"ID_entity": [%item.ID_entity%],
			"name": "[%item.name%]",
			"items": [
				[%FOREACH item IN item.items%]
				{
					"ID": [%item.ID%],
					"ID_entity": [%item.ID_entity%],
					"name": "[%item.name%]"
				} [%',' IF !loop.last%]
				[%END%]
			]
		}
	]]></entity>
	
</template>