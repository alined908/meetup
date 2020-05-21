from elasticsearch_dsl import analyzer, tokenizer, analysis

html_strip_filters = ["lowercase", "stop", "snowball"]

html_strip = analyzer(
    'html_strip',
    tokenizer="standard",
    filter=html_strip_filters,
    char_filter=["html_strip"]
)

edge_ngram_filter = analysis.token_filter(
    "edge_ngram_filter", 
    "edge_ngram", 
    min_gram = 1, 
    max_gram=10, 
    token_chars=["letter", "digit"]
)

autocomplete = analyzer(
    'autocomplete',
    type="custom",
    tokenizer="standard",
    filter = ['lowercase', edge_ngram_filter]
)


