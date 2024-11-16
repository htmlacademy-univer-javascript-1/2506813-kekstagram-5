function isStringLengthValid(str, maxLength) {
  return str.length <= maxLength;
}

isStringLengthValid('проверяемая строка', 20); // true
isStringLengthValid('проверяемая строка', 18); // true
isStringLengthValid('проверяемая строка', 10); // false

function isPalindrome(str) {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();
  const reversedStr = normalizedStr.split('').reverse().join('');
  return normalizedStr === reversedStr;
}

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл'); // true

function parseTime(timeString) {
  const [hour, minute] = timeString.split(':');
  return hour * 60 + Number(minute);
}

function chekMeeting(dayStart, dayEnd, meetingStart, meetingDuration) {
  const dayStartInMinutes = parseTime(dayStart);
  const dayEndInMinutes = parseTime(meetingStart);
  const meetingStartInMinutes = parseTime(meetingStart);

  return (
    meetingStartInMinutes >= dayStartInMinutes &&
    meetingStartInMinutes + meetingDuration <= dayEndInMinutes
  );
}

/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/

chekMeeting('08:00', '17:30', '14:00', 90); // true
chekMeeting('8:0', '10:0', '8:0', 120); // true
chekMeeting('08:00', '14:30', '14:00', 90); // false
chekMeeting('14:00', '17:30', '08:0', 90); // false
chekMeeting('8:00', '17:30', '08:00', 900); // false
