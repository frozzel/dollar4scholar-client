import React from 'react'
import Member from './Member'
import lsu from '../../assets/img/lsu campus.jpeg'
import cau from '../../assets/img/Cau building.jpeg'
import fsu from '../../assets/img/fsu campus.jpeg'
import nyu from '../../assets/img/NYU campus.jpeg'
import uofh from '../../assets/img/UofH campus.jpeg'
import temple from '../../assets/img/temple campus.jpeg'


export default function TeamSection() {
    const members = [
        {
          name: "LSU",
          university: "Louisiana State University",
          description: "Animi est delectus alias quam repellendus nihil nobis dolor. Est sapiente occaecati et dolore. Omnis aut ut nesciunt explicabo qui. Eius nam deleniti ut omnis repudiandae perferendis qui. Neque non quidem sit sed pariatur quia modi ea occaecati. Incidunt ea non est corporis in.",
          imageSrc: lsu
        },
        {
          name: "CAU",
          university: "Clark Atlanta University",
          description: "Aspernatur iste esse aliquam enim et corporis. Molestiae voluptatem aut eligendi quis aut. Libero vel amet voluptatem eos rerum non doloremque. Dolores eum non.",
          imageSrc: cau
        },
        {
          name: "FSU",
          university: "Florida State University",
          description: "Ut enim possimus nihil cupiditate beatae. Veniam facere quae non qui necessitatibus rerum eos vero. Maxime sit sunt quo dolor autem est qui quaerat aliquid. Tenetur possimus qui enim.",
          imageSrc: fsu
        },
        {
          name: "NYU",
          university: "New York University",
          description: "Sint qui cupiditate. Asperiores fugit impedit aspernatur et mollitia. Molestiae qui placeat labore assumenda id qui nesciunt quo reprehenderit. Rem dolores similique quis soluta culpa enim quia ratione ea.",
          imageSrc: nyu
        },
        {
          name: "U of H",
          university: "University of Houston",
          description: "Aut ex esse explicabo quia harum ea accusamus excepturi. Temporibus at quia quisquam veritatis impedit. Porro laborum voluptatum sed necessitatibus a saepe. Deserunt laborum quasi consequatur voluptatum iusto sint qui fuga vel. Enim eveniet sed quibusdam rerum in. Non dicta architecto consequatur quo praesentium nesciunt.",
          imageSrc: uofh
        },
        {
          name: "Temple University",
          university: "Temple University",
          description: "Amet labore numquam corrupti est. Nostrum amet voluptas consectetur dolor voluptatem architecto distinctio consequuntur eligendi. Quam impedit enim aut nesciunt aut dicta quam exercitationem. Reprehenderit exercitationem magnam. Ullam similique ut voluptas totam nobis porro accusamus nulla omnis.",
          imageSrc: temple
        },
      ];
    
  return (
    <section id="team" className="team">
      <div className="container">
        <div className="row">
          {members.slice(0).reverse().map((member, index) => (
            <Member 
              key={index}
              name={member.name}
              university={member.university}
              description={member.description}
              imageSrc={member.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
