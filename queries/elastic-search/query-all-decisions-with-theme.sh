#!/bin/bash

curl --location --globoff 'https://slimme-lokale-bron-testgemeente.s.redhost.be/search/agenda-items/search?page[size]=10&page[number]=0&filter[%3Ahas%3Athemas]=t' \
--header 'Accept: application/vnd.api+json' \