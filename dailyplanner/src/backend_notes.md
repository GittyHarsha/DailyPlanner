## IDBFactory

- interface to access the databases
- window.indexedDB implements this

## IDBObjectStore

- records within the object store are sorted according to keys

## Problems

- how to store nested objects?


February_2024:
{
    habit_tracker: 
    [
        {
            name: 'reading',
            checks: [1, 1, 1, 0, 1, 0, 1, 0]
        },
    ],
    monthly_goals: 
    [
        {
            name: 'x',
            completed: true,
        },
        {
            name: 'xyz',
            completed: false,
        }
    ]
}











2024: 
[
    {
        month_name: "February",
        month_days: '28',
        monthly_goals: 
        [
            {
                goal_name: "extension",
                checked: false,
            },            
        ]
    }
]
