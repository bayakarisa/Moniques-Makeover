// This is a simple script to help you run the website locally
// You would typically put this in a separate file and run it with Node.js

const { exec } = require("child_process")
const fs = require("fs")
const path = require("path")

// Check if Next.js is installed
console.log("Checking if Next.js is installed...")

// Create a package.json file if it doesn't exist
if (!fs.existsSync("package.json")) {
  console.log("Creating package.json...")
  const packageJson = {
    name: "moniquesmakeovers",
    version: "1.0.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint",
    },
    dependencies: {
      next: "^14.0.0",
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      tailwindcss: "^3.3.0",
      "lucide-react": "^0.294.0",
      "@radix-ui/react-dropdown-menu": "^2.0.6",
      "@radix-ui/react-slot": "^1.0.2",
      "class-variance-authority": "^0.7.0",
      clsx: "^2.0.0",
      "tailwind-merge": "^2.1.0",
    },
    devDependencies: {
      "@types/node": "^20.10.0",
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      typescript: "^5.3.0",
      autoprefixer: "^10.4.16",
      postcss: "^8.4.31",
    },
  }

  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2))
}

// Install dependencies
console.log("Installing dependencies...")
exec("npm install", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error installing dependencies: ${error.message}`)
    return
  }

  console.log(stdout)

  // Run the development server
  console.log("Starting the development server...")
  console.log("The website will be available at http://localhost:3000")

  const devProcess = exec("npm run dev")

  devProcess.stdout.on("data", (data) => {
    console.log(data)
  })

  devProcess.stderr.on("data", (data) => {
    console.error(data)
  })
})

