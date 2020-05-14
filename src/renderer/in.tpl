{{ range $index, $resource := (ds "data").resources -}}
    {{ add 1 $index }}: {{ $resource.course }}
{{ end }}
