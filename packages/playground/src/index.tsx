import { render } from 'solid-js/web'

import './index.css'
import 'virtual:uno.css'

import App from './App'
import { Router } from '@solidjs/router'



render(() => <Router><App /></Router >, document.getElementById('root') as HTMLElement)
