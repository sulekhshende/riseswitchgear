import { Panel } from "./panel";

it('implements optimistic concurrency control', async() => {
    //create an instance of panel
    const panel = Panel.build({
        title: 'MCC Panel',
        price: 457,
        userId: '123'
    })

    //save the panel to database 
    await panel.save();

    //fetch panel twice
    const firstInstance = await Panel.findById(panel.id);
    const secondInstance = await Panel.findById(panel.id);

    //make two seperate changes to the panels we fetched
    firstInstance!.set({ price:10 });
    secondInstance!.set({ price:15 });

    //save the first fetched panel
    await firstInstance!.save();

    //save the second fetched panel
    try{
        await secondInstance!.save();
    }catch(err){
        return;
    }

    throw new Error('Should not reach this point');
});

it('increments version number on multiple saves', async() => {
    const panel = Panel.build({
        title: 'Rcc Panel',
        price: 77,
        userId: '1151'
    });

    await panel.save();
    expect(panel.version).toEqual(0);
    await panel.save();
    expect(panel.version).toEqual(1);
})