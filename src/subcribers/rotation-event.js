

// @EventSubscriber()
export class RotationEventSubscriber {
    constructor() {
        this.rotationLuckService = container.get('rotationLuckService');
    }


    async create(@Body() body: any, @Res() res: any) {
        try {
            const result = await this.rotationLuckService.create(body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}