import os
import json
from datetime import datetime, timezone
from icalendar import Calendar, Event

dir_path = r'../web/src/data'

organizations = json.load(open(os.path.join(dir_path, 'combined.json'), 'r'))

c = Calendar()
c.add('prodid', '-//Greetup//mke_tech_events//EN')
c.add('version', '2.0')

for organization in organizations:
    for event in organization['events']:
        e = Event()
        e.add('summary', event['name'])
        e.add('description', event['description'])
        e.add('dtstart', datetime.fromisoformat(event['startDate']))
        e.add('dtend', datetime.fromisoformat(event['endDate']))

        if event.get('location') is not None:
            location = event['location']
            parts = []

            if location.get('name') is not None:
                parts.append(location['name'])

            if location.get('address') is not None and location['address'].get('streetAddress') is not None:
                addr = location['address']
                postal_code = addr.get('postalCode', '')
                parts.append('{0}, {1} {2}, {3}'.format(
                    addr['streetAddress'],
                    addr['addressLocality'],
                    addr['addressRegion'],
                    postal_code,
                ))

            e.add('location', ', '.join(parts))

        c.add_component(e)

with open(os.path.join(dir_path, 'mke_tech_events.ics'), 'wb') as my_file:
    my_file.write(c.to_ical())
