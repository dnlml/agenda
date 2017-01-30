<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" media="screen" href="assets/styles/main.css">
  <title>Agenda</title>
  <script>
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");
  </script>
</head>
<body>
  <header>
    <h1>Agenda</h1>
  </header>
  <main id="root" style="display: flex">
    <div class="calendar">
      <div class="calendar__header">
        <div class="calendar__arrow--prev">&lang;</div>
        <div class="calendar__month-names__list" data-month-name></div>
        <div class="calendar__arrow--next">&rang;</div>
      </div>
      <div class="calendar__body">
        <ul class="calendar__week">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <?php
          $day = (int)date("d");
          $month = (int)date("m");
          $year = date("Y");
        ?>
        <div class="calendar__month__list" data-slider>
          <?php
            // Loop throughout the months
            for ($i = 1; $i <= 12; $i++) :
          ?>
            <div class="calendar__month__item" data-month="<?php echo $i; ?>">
              <ul class="calendar__day__list">
                <?php
                  // get the number of days for each month
                  $date = mktime(12, 0, 0, $i, 1, $year);
                  $daysInMonth = cal_days_in_month(CAL_GREGORIAN, $i, $year);
                  // add the offset to leave the empty cells in the calendar
                  $offset = date("w", $date);
                  for($j = 1; $j <= ($daysInMonth+$offset); $j++) :
                    $dayNumber = ($j <= $offset) ? '' : $j-$offset;
                    // print the cells
                    $dayCurrent = ($j == $day && $i == $month) ? 'calendar__day__item--current' : 'calendar__day__item';
                    echo '<li class="'. $dayCurrent.'">'. $dayNumber .'</li>';
                  endfor;
                ?>
              </ul>
            </div>
          <?php endfor; ?>
        </div>
      </div>
    </div>

    <day></day>
    <modal></modal>

  </main>
  <script src="assets/scripts/main.js"></script>
</body>
</html>
<span></span>
