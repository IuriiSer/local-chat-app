## WhyS

### Почему new BroadcastChannel('all')

Учитвая ТЗ, а именно подключение к одному чату, было бы правильнее использовать ID чата, но т.к. моей задачей было сделать чуть больше и реализовать простенькую версию мессенджера, типа телеги, я использую общий канал связи.

**НО ведь это неправильно** возразите вы и будете правы, но подымать >1000 каналов для пользователя в каждой вкладке очень плохая идея, ведь у нас **высоконагруженный** сервис. Обеспечить защиту канала шифрованием, кончено, можно, но это сильно усложнит всю задачу

### Сервисы / Интерфейсы / Драйверы

Все эти сущности являюстся частью архитектурны Clean Architecture, что требует время затрат в начале проекта, но сильно облегчает поддержку кода в последующем

### Пара ньюансов



## START PROJECT

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

