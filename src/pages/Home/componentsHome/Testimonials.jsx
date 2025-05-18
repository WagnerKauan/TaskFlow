import { motion } from "framer-motion"

export default function Testimonials() {


  return (
    <section className="py-16 bg-gray-50">
      {/* Depoimentos */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">O que estão dizendo</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: "Ana Paula",
              feedback: "Desde que comecei a usar o TaskFlow, minha produtividade aumentou muito! Recomendo demais.",
            },
            {
              name: "Lucas Andrade",
              feedback: "A interface é simples, bonita e muito intuitiva. Organizar minhas tarefas ficou mais fácil.",
            },
          ].map(({ name, feedback }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-gray-100 p-6 rounded-xl shadow text-left"
            >
              <p className="text-gray-700 italic mb-2">“{feedback}”</p>
              <span className="font-semibold text-blue-600">— {name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}