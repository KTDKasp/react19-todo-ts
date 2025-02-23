import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { TodoProvider } from './helpers';

import { routeTree } from './routeTree.gen';
import './global.css';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<TodoProvider>
			<RouterProvider router={router} />
		</TodoProvider>
	</StrictMode>
);
