
import AddNewPlayer from "../components/NewPlayer"

const Admin = () => {

    const matches = {
        "round-id": null,
        "start-date": null,
        "end-date": null,
        "entry-fee": null,
        "jackpot": null,
        "matches": {},
        "picks": {},
        "year": null,
    }

    return(
        <>
            <h2>Hello Admin!</h2>
            <section>
                <h3>Generar tarjeta</h3>
                <form action="">
                    <div>
                        <input type="number" name="year" id="" placeholder="Fecha número" value="2024"/>
                        <input type="number" name="round-id" id="" placeholder="Fecha número"/>
                        <input type="datetime-local" name="start-date" id=""/>
                        <input type="datetime-local" name="end-date" id=""/>
                        <input type="number" name="entry-fee" id="" placeholder="Valor de la tarjeta"/>
                    </div>
                    <div>
                        <input type="text" name="day" id="" placeholder="Día" />
                        <input type="text" name="home" id="" placeholder="Local" />
                        <input type="text" name="away" id="" placeholder="Visitante" />
                    </div>
                </form>
            </section>
        </>
    )
}

export default Admin