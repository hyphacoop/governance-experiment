As part of my preliminary research, I have been parsing meeting notes with a python script in search of new insights.
One output of this research looked at the number of projects at Hypha over time.

# Context 
All hands usually have a section dedicated to Project Updates.
I wrote a script that parses meeting notes and keeps a project count.
The intent was to see how many project Hypha has actively worked on over time.

# SVG Output
![output](https://github.com/hyphacoop/governance-experiment/assets/631268/92b6ac08-8e5c-4349-ba02-f74a026d2144)


# Notes
There are limits and caveats to this technique as this automated parsing depends on a specific meeting template. This means project count might be incorrect. I have also excluded low project count as it seems like a parsing/formatting error. 