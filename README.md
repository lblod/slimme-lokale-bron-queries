# Slimme Lokale Bron Queries

This repository contains reusable SPARQL query patterns and examples for retrieving and combining data from the LBLOD ecosystem. The purpose is to support smart data access for local government data published as linked open data.

## Repository Structure

- `queries/`
  Contains SPARQL query files focused on specific data retrieval use cases.
  - `elastic-search/`
  Contains script files with curl queries with specific filtering possibilities.
  To run the script files run for example this command:
    ```bash
    ./queries/elastic-search/<name_of_the_file>
    ```

- `data-issues.md`
  Documents known data quality issues.

- `LICENSE`
  MIT license file.

## Getting Started

Clone the repository locally:

```bash
git clone https://github.com/lblod/slimme-lokale-bron-queries.git
```

Open the `queries` directory and inspect the available sparql query templates. Each query can be adapted to your own endpoint, filters, or integration pipeline.

## Usage

The queries in this repository can be used to:

- Retrieve decisions for a specific local authority
- Filter decisions by date, theme, or governing body
- Fetch related resources such as documents or attachments


Queries are written in SPARQL and are intended to be readable and adaptable.

## Elasticsearch Search API Usage

This project can be combined with the Slimme Lokale Bron search API, which is backed by Elasticsearch and exposed using a JSON:API compatible interface.

We use the [Mu-Search](https://github.com/mu-semtech/mu-search) repo where you can find all the documentation about how to create the queries. Here you can find all the possibilities: [Search possibilities](https://github.com/mu-semtech/mu-search?tab=readme-ov-file#get-typesearch)

Example request:

```bash
curl --location --globoff 'https://slimme-lokale-bron-testgemeente.s.redhost.be/search/agenda-items/search?page[size]=15&page[number]=0&filter[:has:themas]=t&filter[:query:themas.label]=Algemene financiën' \
  --header 'Accept: application/vnd.api+json'
```

This endpoint searches **agenda items** and supports pagination, filtering and full text queries on indexed fields.

### Pagination

Pagination is controlled using the `page` parameters:

- `page[size]` – number of results per page
- `page[number]` – zero based page index

Example:

```text
?page[size]=15&page[number]=0
```

Use higher page numbers to retrieve the next result sets.

### Filtering on Relations and Fields

The API exposes Elasticsearch filters using a structured syntax:

```
filter[:has:<field>]=t
filter[:query:<field>]=<value>
```

In the example:

- `filter[:has:themas]=t` ensures that only agenda items with at least one theme are returned
- `filter[:query:themas.label]=Algemene financiën` performs a full text match on the theme label field

### Retrieving All Themes from a Concept Scheme

To retrieve all available themes belonging to a specific concept scheme, you can query the themes search endpoint with a `conceptScheme` filter.

Example request:

```bash
curl --location --globoff 'https://slimme-lokale-bron-testgemeente.s.redhost.be/search/themas/search?page[size]=15&page[number]=0&filter[conceptScheme]=https://data.vlaanderen.be/id/conceptscheme/BesluitThema' \
  --header 'Accept: application/vnd.api+json'
```

This request returns all themes that are part of the **BesluitThema** concept scheme.

Typical use cases:

- Loading the complete list of decision themes
- Building controlled vocabularies for filtering
- Ensuring consistent theme usage across applications

The returned theme labels can be reused directly in agenda item searches, for example:

```text
filter[:query:themas.label]=Algemene financiën
```

### Full Text Search
- The `:fuzzy:` operator is used to query with fuziness set to "AUTO" and allowing to match multiple fields. For more info -> [Click here](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-fuzzy-query)
- The `:query:` operator maps to Elasticsearch full text search. For more info -> [Click here](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-query-string-query)

Examples:

```text
filter[:fuzzy:themas.label]=bestuur
filter[:query:themas.label]=Algemene financiën
filter[:query:themas.label]=("Algemene financiën" OR "Mobiliteit")
filter[:query:themas.label]=("Algemene financiën" AND "Algemeen bestuur en financiën")
```
With the `:query:` operator you can combine multiple words into 1 filter  with the `OR` and `AND` operators.

### Sorting

Sorting can be applied using:

```text
sort[label]=asc
sort[label]=desc
```

Where asc indicates ascending order and desc descending order.

### Combined Queries

Filters can be freely combined:

```text
?page[size]=10&page[number]=0&filter[:has:themas]=t&filter[:query:themas.label]=("Algemene financiën" OR "Mobiliteit")&sort[session_planned_start.field]=asc
```

This allows building advanced search interfaces with:

- Faceted filtering
- Free text search
- Multi theme selection
- Pagination
- Sorting

## Contributing

Contributions are welcome. You can propose new query patterns, improvements, or documentation updates by opening an issue or pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
