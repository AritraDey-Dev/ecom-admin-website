# Use the official Node.js image with LTS (Long Term Support) version as the base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Install Shadcn CLI globally (if needed)
RUN npm install -g shadcn

# Install Clerk for Next.js
RUN npm install @clerk/nextjs

# Install Shadcn-UI and add button component
RUN npx shadcn-ui@latest add button

RUN npx shadcn-ui@latest add dialog
RUN npm install zustand
RUN npx shadcn-ui@latest add form
RUN npx shadcn-ui@latest add input
RUN npm i -D prisma
RUN npm install @prisma/client
Run npx prisma init
RUN npx prisma generate
RUN npx prisma db pushpsql -U postgres
Run npm install axios
RUN npm install  react-hot-toast
# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application for production
RUN npm run build

# Expose the port Next.js is running on (default is 3000)
EXPOSE 3000

# Set environment variables (if needed)
# ENV NODE_ENV=production

# Command to run the Next.js application
CMD ["npm", "start"]
