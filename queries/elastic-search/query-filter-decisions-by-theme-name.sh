#!/bin/bash

curl --location --globoff 'https://slimme-lokale-bron-testgemeente.s.redhost.be/search/agenda-items/search?page[size]=10&page[number]=0filter[%3Ahas%3Athemas]%3Dt&filter[%3Aquery%3Athemas.label]=(%22Algemene%20financi%C3%ABn%22%20OR%20%22Mobiliteit%22)&sort[session_planned_start.field]=asc' \
--header 'Accept: application/json' \