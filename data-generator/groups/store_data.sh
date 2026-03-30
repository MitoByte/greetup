#!/bin/bash
if [ "$DATA_ENV" = 'production' ]; then
    # production mode
    export 'DATA_DIR'='/app/data'
  else
    # dev mode
    export DATA_DIR='../data/'
fi

mkdir -p $DATA_DIR

while IFS= read -r line; do
	# Split the line by comma and assign to two variables
  IFS=',' read -r type name url <<< "$line"

  echo "Processing: $type -> $name"

  mkdir -p "$DATA_DIR/$name"

  if [ "$type" == "linkedin" ]; then
    response=$(../../getHtml.sh $url)
  else 
    response=$(curl -L $url)
  fi

  if [ "$type" == "meetup" ]; then
    script_tags=$(echo $response | hq '{scripts: script[type="application/ld+json"]  | [@text]}')
    scripts=$(echo $script_tags | xq '.scripts')

    if [ "$scripts" == "null" ]; then
      organizations="[]"
      events="[]"
    else
      organizations=$(echo $script_tags | xq '[.scripts[]  | fromjson | select(type == "object" and .["@type"]=="Organization" and .["name"]!="Meetup")]')
      events=$(echo $script_tags | xq '.scripts[]  | fromjson | select(type == "array")')
    fi

    echo $organizations > "$DATA_DIR/$name/organizations.json"
    echo $events > "$DATA_DIR/$name/events.json"
  fi

  if [ "$type" == "eventbrite" ]; then
  	script_tags=$(echo $response | hq '{scripts: script[type="application/ld+json"]  | [@text]}')
    scripts=$(echo $script_tags | xq '.scripts')

    if [ "$scripts" == "null" ]; then
      organizations="[]"
      events="[]"
    else
      attr_tags=[$(echo $response | hq '{title: meta[property="og:title"]  | @(content)}'),
      attr_tags+=$(echo $response | hq '{description: meta[property="og:description"]  | @(content)}'),
      attr_tags+=$(echo $response | hq '{image: meta[property="og:image"]  | @(content)}'),
      attr_tags+=$(echo $response | hq '{url: meta[property="og:url"] | @(content)}')]
      organizations=$(echo $attr_tags | xq 'add | [.]')

      # echo $script_tags | xq '.scripts[1] | fromjson | .itemListElement'
      events=$(echo $script_tags | xq '.scripts[1] | fromjson | .itemListElement | map(.item)')
      isEmpty=$([ -z "$events" ] && echo "Empty" || echo "Not empty")

      if [ "$isEmpty" = 'Empty' ]; then
        echo "No events found for $name"
        echo "[]" > "$DATA_DIR/$name/events.json"
      else
        echo $events > "$DATA_DIR/$name/events.json"
      fi
    fi
    
    echo $organizations > "$DATA_DIR/$name/organizations.json"
  fi

  if [ "$type" == "linkedin" ]; then
    echo $response
    script_tags=$(echo $response | hq "{title: .org-top-card-summary__title}")
    # script_tags=$(echo $response | hq '{scripts: h1["org-top-card-summary__title"]  | [@text]}')
    echo $script_tags
    scripts=$(echo $script_tags | xq '.scripts')

    if [ "$scripts" == "null" ]; then
      organizations="[]"
      events="[]"
    else
      organizations=$(echo $script_tags | xq '[.scripts[]  | fromjson | select(type == "object" and .["@type"]=="Organization" and .["name"]!="Meetup")]')
      events=$(echo $script_tags | xq '.scripts[]  | fromjson | select(type == "array")')
    fi

    echo $organizations > "$DATA_DIR/$name/organizations.json"
    echo $events > "$DATA_DIR/$name/events.json"
  fi
done
