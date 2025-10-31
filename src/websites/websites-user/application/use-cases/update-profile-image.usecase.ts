import { Injectable } from '@nestjs/common';
import { WebsitesHelper } from 'src/websites/infra/helpers/websites.helper';

@Injectable()
export class UpdateProfileImageUseCase {
  constructor(
    private readonly websitesHelper: WebsitesHelper,
  ) {}

  async execute(userId: string, profileImage: string): Promise<string> {
    const website = await this.websitesHelper.findOneByUserId(userId);
    if (website.getProfileImage() === profileImage) {
      return website.getProfileImage()!;
    }
    website.setProfileImage(profileImage);
    const updatedWebsite = await this.websitesHelper.update(website);
    return updatedWebsite.getProfileImage()!;
  }
}
