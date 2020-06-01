const {Client, MessageEmbed, Message} = require('discord.js');
const client = new Client({
    disableEveryone: true
});
const { token, prefix } = require('./config.json');

const kolory = require('./kolory.json');



client.on('warn', console.warn);

client.on('error', console.error);

//ready
client.on("ready", () => {
    console.log(` >> ${client.user.tag} << z id >> ${client.user.id} <<`);
    let activities = [`🧙‍♂️ skidaddle skidoodle`, `🧙‍♂️ Hogwart przy mnie ssie`],
        i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "PLAYING"
    }), 100000);


});

//magic


client.on('message', async message => {


    if (message.content.startsWith(`${prefix}hagrid`)) {

        if (message.channel.type !== 'dm') {

            let dmEmbed = new MessageEmbed()
                .setDescription('Magicy nie zdradzają swoich sztuczek! Użyj tej komendy w prywatnym magicznym paragrafie do <@716694591209734357>! ')
                .setFooter('🧙‍♂️ Magic IceTray 🥶 | Kazik#2642')
                .setColor(kolory.red_light);
            message.author.send(dmEmbed);
            message.delete();

        } else {

            let propozycjaEmbed = new MessageEmbed();
            propozycjaEmbed.setDescription('```PODAJ HASŁO:```');
            propozycjaEmbed.setFooter("🧙‍♂️ Magic IceTray 🥶 | Kazik#2642")
            propozycjaEmbed.setColor(kolory.ice);

            message.author.send(propozycjaEmbed);


            let filter = m => !m.author.bot;
            const collector = message.channel.createMessageCollector(filter, {
                time: 15000
            });

            let counter = 0;

            collector.on('collect', (message, col) => {
                console.log("Skolekcjonowana wiadomość: " + message.content);
                counter++;
                if (counter === 1) collector.stop();
            
                if(message.content === `${prefix}kwg2505467846782005`)
                {
                    const appprovedmagicEmbed = new MessageEmbed()
                        .setTitle(" Witamy w Krainie Magii!  🧙‍♂️")
                        .setDescription("Totalnie nie mam pojęcia po co ten cały trud, ale przynajmniej czasami jest ciekawiej. Za poświęcony czas przedstawiam ci twoją nagrodę: ")
                        .addField("`NAGRODA: `", "[KLIKNIJ TUTAJ ABY ODEBRAĆ NAGRODĘ](https://open.spotify.com/playlist/4ymsl4ODOPDQXp7bWfyZdb?si=Hm1TZiB0RTaLqV-Nov5xBg)")
                        .addField("```SPODOBAŁ SIĘ ZAGADKOWY ŚWIAT?```", "Pamiętaj, że zawsze może być tego więcej. Masz pomysł? `?propozycja` do <@714559507132580010> i opisz swój pomysł!")
                        .setFooter("Magic Ice Tray 🧙‍♂️🥶 | Kazik#2642");

                    message.author.send(appprovedmagicEmbed);
                } else if (message.content !== `${prefix}kwg2505467846782005`){
                    const bladhasloEmbed = new MessageEmbed()
                    .setColor(kolory.red_light)
                    .setDescription("Przykro mi `MUGOLU!` JAK ŚMIESZ WCHODZIĆ DO ŚWIATA MAGII NIE ZNAJĄC HASŁA!\n\n" +
                    
                    
                    "Chcesz je poznać? Poproś ładnie <@190755326637768704>, może ci da 🤔🤔🤔");
                    message.author.send(bladhasloEmbed);
                }
            });
            collector.on('end', collected => {
                console.log(collected.size);

            });
        };
    };
});






client.login(process.env.token);

