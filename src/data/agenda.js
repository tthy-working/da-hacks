/**
 * The confirmed 5.0 run of show, from the organisers' call sheet.
 *
 * Attendee-facing only. The call sheet is a working document and carries the
 * crew's own rows -- setup and clean-up blocks, "arrive two hours prior",
 * "test projectors", "check equipment with Di", laying out the check-in table
 * -- which belong on a clipboard rather than the public schedule.
 *
 * One row per time. Anything the call sheet runs concurrently is joined with
 * a middot rather than repeating the clock, and names are cut to the thing
 * itself: the detail underneath each one ("15-minute team formation for solo
 * hackers", "dietary accommodations clearly labeled", the Discord reminders)
 * is for the crew running it, not for someone scanning what happens when.
 *
 * `key: true` highlights a row (ceremonies, deadlines, judging).
 */
export const AGENDA = [
  {
    day: 'Saturday, Oct. 16',
    events: [
      { time: '8:00 AM', what: 'Check-in & breakfast', key: false },
      { time: '9:00 AM', what: 'Opening ceremony', key: true },
      { time: '10:30 AM', what: 'Hacking begins · Workshop 1', key: true },
      { time: '11:15 AM', what: 'Workshop 2', key: false },
      { time: '1:00 PM', what: 'Lunch', key: false },
      { time: '6:00 PM', what: 'Dinner', key: false },
      { time: '7:00 PM', what: 'Day 1 wrap-up', key: false },
    ],
  },
  {
    day: 'Sunday, Oct. 17',
    events: [
      { time: '8:00 AM', what: 'Check-in & breakfast', key: false },
      { time: '12:00 PM', what: 'Submissions close · Lunch', key: true },
      { time: '1:15 PM', what: 'Judging', key: true },
      { time: '6:30 PM', what: 'Closing ceremony', key: true },
      { time: '8:00 PM', what: 'Doors close', key: false },
    ],
  },
]

/**
 * The room to head for. The call sheet also lists Don Bautista & El Clemente,
 * the Cafeteria and the Fireside Lounge -- kept here on record, but the site
 * shows the one people need in order to find the door on the day.
 */
export const VENUE = 'Conf. Room A & B'
