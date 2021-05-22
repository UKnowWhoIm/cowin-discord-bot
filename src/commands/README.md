## Discord Commands

This directoy contains all commands used by the COWIN-bot. All commands are slash commands to improve UX.

## Table of Contents

1. [/check](#check)
2. [/help](#help)
3. [/notify-me](#notify-me)
4. [/set](#set)

### check

This command is used to manually check for available slots with the given parameters.

Usage
```
/check <DATE> <DISTRICT> <AGE>
```
- If district and age isn't provided, values from db will be loaded. 
- If user has no record in db, error message will be shown.

### help

Shows a list of available commands.

Usage
```
/help
```

### notify-me

Enables hourly notifications for the user if slot is avaiilable.

Requires age and ditrict to be set using [/set](#set) command. Will prompt to set values if empty.

Usage
```
/notify-me
```

### set
This command is used to set the user's age and district in the db.

Usage
```
/set age <AGE>
/set district <DISTRICT>
```
