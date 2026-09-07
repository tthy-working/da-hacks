/**
 * The confirmed 5.0 run of show, from the organisers' call sheet.
 *
 * Attendee-facing only. The call sheet is a working document and carries the
 * crew's own rows -- setup and clean-up blocks, "arrive two hours prior",
 * "test projectors", "check equipment with Di", laying out the check-in table
 * -- which belong on a clipboard rather than the public schedule. Everything
 * a hacker turns up for is here.
 *
 * `key: true` highlights a row (ceremonies, deadlines, judging).
 */
export const AGENDA = [
  {
    day: 'Saturday, Oct. 16',
    events: [
      { time: '8:00 AM', what: 'Check-in, lanyards & merch', key: false },
      { time: '8:00 AM', what: 'Breakfast & mentor office hours open', key: false },
      { time: '9:00 AM', what: 'Opening ceremony: welcome & guest speakers', key: true },
      { time: '9:00 AM', what: 'Themes, tracks, rules & code of conduct', key: false },
      { time: '10:30 AM', what: 'Hacking begins — team formation for solo hackers', key: true },
      { time: '10:30 AM', what: 'Workshop 1', key: false },
      { time: '11:15 AM', what: 'Workshop 2', key: false },
      { time: '1:00 PM', what: 'Lunch', key: false },
      { time: '6:00 PM', what: 'Dinner', key: false },
      { time: '7:00 PM', what: 'Day 1 wrap-up & submission reminder', key: false },
    ],
  },
  {
    day: 'Sunday, Oct. 17',
    events: [
      { time: '8:00 AM', what: 'Day 2 check-in & breakfast', key: false },
      { time: '8:00 AM', what: 'Mentor office hours', key: false },
      { time: '12:00 PM', what: 'Submissions close on Devpost', key: true },
      { time: '12:00 PM', what: 'Lunch in the Cafeteria', key: false },
      { time: '1:15 PM', what: 'Judging', key: true },
      { time: '6:30 PM', what: 'Closing: winners, track prizes & sponsor shoutouts', key: true },
      { time: '6:30 PM', what: 'Group photo & feedback form', key: false },
      { time: '8:00 PM', what: 'Doors close', key: false },
    ],
  },
]

/** Where it all happens, from the same call sheet. */
export const VENUE = 'Conf. Room A & B · Don Bautista & El Clemente · Cafeteria · Fireside Lounge'
