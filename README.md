## Project Details

Sprint 2: Server\
Team members:

- Michael (Hung-Jen) Wang _hwang262_
- Jerry Quan _xjquan_

Hours: 15\
Repo: https://github.com/cs0320-f23/mock-hwang262-xjquan.git

## Design Choices

In order for _view_ and _search_ to maintain their functionality, it is necessary for _load_ to store the filepath when the user inputs it initially. Thus, we decided to declare a constant called _fileString_ that can be leveraged by the _view_ and _search_ functionality. In order for Mock to load consecutive files without crashing, we allow _fileString_ to update whenever a new filepath is loaded, so switching between csv files would now become a feasible approach.

As for the _brief_ and _verbose_ criteria for this Sprint, we decided to keep a header at the top of history to remind users of their current mode. We decided to alter all command history whenever _mode brief_ or _mode verbose_ is called. This is because we decided a crisp and uniform page is what we are aiming for in this Sprint, and we wanted to be explicit that our modes indeed prompt changes.

Finally, for the mocking aspect as a whole, we decided to create four different HTML tables for mocking purposes. We had two tables that represent entire csv files (one with headers and one without headers) to mock our loading and viewing functionality. Thus, the current version would alert _file not found_ for all other filepaths given. The other two tables represent the correct output for two specific searches in the two respective mocked csv files. The first search is for the csv file with headers, and it tests the Age column for the value "18". The second search is for the csv file without headers, and it tests the 2nd column for the value "to". Therefore, the current version would only allow these two searches to provide correct outputs, and it would alert _No searches found_ with the respective column and value desired otherwise. This may seem to be a limited set of mock data, but it actually suffices to demonstrate all user stories, and this decision is due to our group's concensus on focusing more of our time on the frontend and testing (areas where we are both unfamiliar with and may require more time).

## Errors/Bugs

We assumed _alert_ to be a viable design choice for this Sprint. We considered keeping the wrong command alone within history, the wrong command with error annotations, or just the error annotations. But, they all seemed to be contradicting with the history aspect of this Sprint. Therefore, we decided that in order to keep a legitimate record of command history, alerting the users when an incorrect or unfeasable command is typed in would be the best strategy. We decided to include this design choice here incase it is considered an error or bug.

## Tests

We packaged our tests into five different categories, and they are all within the _tests_ directory (_App, Load, Mode, Search, and View_). For each file, we checked edge cases which could lead to errors (or alert messages in our scenarios), and we also gave concrete examples of successful tests. Each file is categorized into successful and erroneous examples, and each test's name defines the scenario playwright is considering. This combination ensures that each component is tested accordingly, and the responses our frontend is providing for user interactions are also yilding the correct behavior.

These tests could be run by typing in _npx playwright test_, _npx playwright show-report_, and _npx playwright test --ui_. Please select the appropriate option, and we also left the html file from playwright within the directory for convenient purposes.

## How to...

Running Mock requires the user to enter _npm start_ on the terminal after entering the correct directory. A page titled _Mock_ should appear if localhost has been successfully run, and the following commands can be leveraged in the input bar.

- Passing in _mode brief_ allows the user to only see the result of the command ran on history.
- Passing in _mode verbose_ allows the user to see both the command itself and the result of the command ran on history.
- Passing in _load_file [**filepath**]_ allows the user to load their desired csv file to be parsed. It should be noted that the users have to make sure the entered filepath is correct, and their file is indeed at the location where their entered filepath points to.
- Passing in _view_ allows the user to view their parsed file after loading successfully. If users want to view another csv file, they should first load the new file as specified above, and then use the view command.
- Passing in _search [**column**] [**index**]_ allows the user to search for targetted values within the specified column in the currently loaded file. If found, the rows would be presented in a table format for the users to visualize their result.

Please note that users can enter _mode brief_ and _mode verbose_ anytime. Regardless of the current history, these two commands can still be toggled whenever a crisp or descriptive interface is desired by the user.

Please also note that the current version is solely based on mocked data, and certain functionalities may not work as intended to.
