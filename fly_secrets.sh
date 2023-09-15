while read -r line; do
  eval "fly secrets set $line"
done <.env
