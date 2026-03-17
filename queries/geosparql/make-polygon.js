const args = process.argv.slice(2);
if (args.length < 3) {
  console.error("usage <lon> <lat> <dist-in-meters>");
  process.exit(-1);
}
const lon = parseFloat(args[0]);
const lat = parseFloat(args[1]);
const dist = parseFloat(args[2]);
const minLon = lon - dist;
const maxLon = lon + dist;
const minLat = lat - dist;
const maxLat = lat + dist;
console.log(`
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX besluit: <http://data.vlaanderen.be/ns/besluit#>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX uom: <http://www.opengis.net/def/uom/OGC/1.0/>
PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sro: <https://data.vlaanderen.be/ns/slimmeraadpleegomgeving#>

SELECT DISTINCT ?agenda ?place ?wkt ?municipality
WHERE {
  ?geometry geo:asWKT ?wkt .
  
  ?zitting a besluit:Zitting ;
           besluit:behandelt/^<http://purl.org/dc/terms/subject> ?agenda .
  
  ?loc a <http://www.w3.org/ns/locn#Location> ;
       <http://www.w3.org/ns/locn#geometry> ?geometry ;
       rdfs:label ?place ;
       prov:wasDerivedFrom ?geoDerivedFrom .
  
  
  ?agenda prov:generated ?decision .
  
  ?zitting besluit:isGehoudenDoor ?governingBody .
   optional { 
    {
        ?governingBody besluit:bestuurt ?bt .
        ?bt besluit:werkingsgebied ?abstractLocation .
        ?abstractLocation rdfs:label ?abstractLocationLabel .
    } UNION {
        ?governingBody <http://data.vlaanderen.be/ns/mandaat#isTijdspecialisatieVan> ?tijd .
        ?tijd besluit:bestuurt ?bt .
        ?bt besluit:werkingsgebied ?location .
        ?location rdfs:label ?locationLabel .
    }
    BIND(COALESCE(?abstractLocationLabel, ?locationLabel) AS ?municipality)

  }
  
  
  FILTER(
    geo:sfWithin(
      ?wkt,
      "<http://www.opengis.net/def/crs/EPSG/0/31370> POLYGON((${minLon} ${minLat}, ${minLon} ${maxLat}, ${maxLon} ${maxLat}, ${maxLon} ${minLat}, ${minLon} ${minLat}))"^^geo:wktLiteral
    )
  )
}
`);
