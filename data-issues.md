### Html page: 

`https://raadpleeg-integratie.onlinesmartcities.be/zittingen/25.1205.2713.8671/besluitenlijst`

### Typeof issue with double quotes, example:

```html
<div property="prov:generated" typeof=”besluit:Besluit” resource="http://www.greenvalleybelgium.be/id/besluiten/25.1205.1804.6342" >
```


### missing "ext:" prefix, example:

```html
<span property="ext:content" resource="https://data.vlaanderen.be/id/adres/3834991" typeof="http://www.w3.org/ns/locn#Address">
```


### missing unique identifier for BesluitThema:

```html
<span about="http://www.greenvalleybelgium.be/id/besluiten/" property="http://purl.org/dc/terms/subject" resource="https://data.vlaanderen.be/id/concept/BesluitThema/2f736f3c-9328-4c72-9a78-9c6090d90c9f"></span><span about="http://www.greenvalleybelgium.be/id/besluiten/" property="http://purl.org/dc/terms/subject" resource="https://data.vlaanderen.be/id/concept/BesluitThema/251e843a-522d-4c64-ad67-8dec54041e37"></span></span>

```
