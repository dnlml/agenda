<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" media="screen" href="assets/styles/main.css">
  <title>Agenda</title>
  <script>
    <?php // Check if js is active ?>
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");
  </script>

  <!-- favicon -->
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
  <link rel="manifest" href="/manifest.json">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="theme-color" content="#ffffff">

</head>
<body>
  <header class="header">
    <h1>Agenda</h1>
  </header>
  <main id="root" class="main">
    <div class="calendar" data-calendar>
      <div class="calendar__header" data-calendar-header>
        <div class="calendar__arrow--prev" data-calendar-nav="prev">&lang;</div>
        <div class="calendar__month-names__list" data-month-name></div>
        <div class="calendar__arrow--next" data-calendar-nav="next">&rang;</div>
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
        <?php // Print out the months and create de structure ?>
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
                    $dayCurrent = ($j == $day + $offset && $i == $month) ? 'calendar__day__item--current' : 'calendar__day__item';
                    echo '<calendar-day class="'. $dayCurrent .'" day="'. $dayNumber .'" month="'. $i .'"><span>'. $dayNumber .'</span></calendar-day>';
                  endfor;
                ?>
              </ul>
            </div>
          <?php endfor; ?>
        </div>
      </div>
    </div>

    <?php // Vue.js components ?>
    <day></day>
    <modal></modal>

  </main>
  <script src="assets/scripts/main.js"></script>
</body>
</html>
