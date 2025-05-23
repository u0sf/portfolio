'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import Navigation from '@/components/Navigation'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Project, projects } from '@/data/projects'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative z-10">
        <Navigation />
        <section className="pt-32 pb-16 px-4">
          <div className="container">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              Projects
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -5 }}
                  className="card flex flex-col"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-gray-900 dark:text-white">{project.title}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{project.createdAt}</span>
                    </div>
                    <p className="mb-4 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="badge-primary"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-auto">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                        >
                          View on GitHub
                        </a>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="btn-accent mt-4"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Details Modal */}
        <Dialog
          open={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-3xl card">
              {selectedProject ? (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <Dialog.Title className="text-gray-900 dark:text-white">
                      {selectedProject.title}
                    </Dialog.Title>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{selectedProject.createdAt}</span>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  <p className="mb-6">
                    {selectedProject.fullDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tools.map((tool) => (
                      <span
                        key={tool}
                        className="badge-primary"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        View on GitHub
                      </a>
                    )}
                  </div>
                </>
              ) : null}
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </main>
  )
} 