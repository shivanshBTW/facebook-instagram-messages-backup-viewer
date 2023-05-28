# Facebook Instagram Messages Backup Viewer

Created this project as accessing old instagram and facebook messages is way too complicated and needed to find a way to read my old messages to relive some memories.

This is completely open source and everything you need to run it will not need internet access at all.
It requires you to download your data from [Facebook's Download your Information page](https://www.facebook.com/privacy/guide/dyi/?entry_point=privacy_center_home)

More on how to use this data later in the readme

## Steps to run

You have to select JSON format while requesting the account infomation, and for good measure, use the highest quality of media possible. This will improve your experience.

Once you have requested your account data information, you need to extract the zip of the data. Let's assume your extracted folder is `instagram-data`

Now, clone this project onto your machine, or download it's ZIP from the download zip option. Now once you download or extract this zip (let's assume it's folder is called `FIMB-project`), copy all folders under `instagram-data/messages/inbox` to `FIMB-project/src/message-data/`

Now, here's the kinda tricky part, you need a list of names of all folders you just pasted. For example you have 3 folders that you just pasted into `message-data` called `user1`, `user2`, `user3` you have to create a list that looks like this
`["user1", "user2", "user3"]`

hint: one easy way of doing this is selecting all such folders in visual studio code (free software) and right click and select copy relative path. Then paste everything onto a new file, select everything except the folder name for one of the entries, copy it, paste it in find and replace and replace it with an empty string. Now, you have a list of all the names and just need to format them in the above manner(you basically have to create an array of strings).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
